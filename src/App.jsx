import Presentation from './components/Presentation.jsx';
import NotesApp from './components/NotesApp.jsx';

// "?notes" opens the presenter-notes window (keep it off the shared screen).
const isNotes = new URLSearchParams(window.location.search).has('notes');

export default function App() {
  return isNotes ? <NotesApp /> : <Presentation />;
}
