# Generates TEMPORARY rehearsal narration with a voice built into Windows.
# Not for the final session: replace these files with recorded or AI-studio MP3s.
#
# Usage:
#   powershell -ExecutionPolicy Bypass -File scripts\tts-windows.ps1 -In scripts\tts-lines.json -OutDir public\audio\narration -Voice "Microsoft Mark"
# tts-lines.json: [{ "file": "p1-s1.wav", "text": "..." }, ...]  (made by scripts/tts-lines.mjs)
param(
  [Parameter(Mandatory = $true)][string]$In,
  [Parameter(Mandatory = $true)][string]$OutDir,
  [string]$Voice = 'Microsoft Mark',
  [double]$Rate = 1.0
)

Add-Type -AssemblyName System.Runtime.WindowsRuntime
[Windows.Media.SpeechSynthesis.SpeechSynthesizer, Windows.Media.SpeechSynthesis, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.Streams.DataReader, Windows.Storage.Streams, ContentType = WindowsRuntime] | Out-Null

$asTask = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
    $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1'
  })[0]
function Await($op, [Type]$type) {
  $t = $asTask.MakeGenericMethod($type).Invoke($null, @($op))
  $t.Wait() | Out-Null
  $t.Result
}

$synth = New-Object Windows.Media.SpeechSynthesis.SpeechSynthesizer
$v = [Windows.Media.SpeechSynthesis.SpeechSynthesizer]::AllVoices | Where-Object { $_.DisplayName -eq $Voice } | Select-Object -First 1
if (-not $v) { throw "Voice '$Voice' not found." }
$synth.Voice = $v
$synth.Options.SpeakingRate = $Rate

New-Item -ItemType Directory -Force $OutDir | Out-Null
$lines = Get-Content $In -Raw -Encoding UTF8 | ConvertFrom-Json
foreach ($l in $lines) {
  $stream = Await ($synth.SynthesizeTextToStreamAsync($l.text)) ([Windows.Media.SpeechSynthesis.SpeechSynthesisStream])
  $reader = New-Object Windows.Storage.Streams.DataReader($stream.GetInputStreamAt(0))
  $size = [uint32]$stream.Size
  Await ($reader.LoadAsync($size)) ([uint32]) | Out-Null
  $bytes = New-Object byte[] $size
  $reader.ReadBytes($bytes)
  $path = Join-Path $OutDir $l.file
  [IO.File]::WriteAllBytes($path, $bytes)
  # WAV duration from header: data bytes / byte rate
  $byteRate = [BitConverter]::ToInt32($bytes, 28)
  $secs = [math]::Round(($size - 44) / $byteRate, 1)
  Write-Output ("{0}`t{1}s" -f $l.file, $secs)
}
