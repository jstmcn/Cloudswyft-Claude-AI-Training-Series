import {
  AppWindow, BadgeCheck, BarChart3, Bell, BookOpen, Bot, Briefcase, Building2, CalendarClock,
  CheckCircle2, Code2, Copy, Eye, FileCheck, FilePlus2, FileSearch, FileText, FlaskConical,
  FolderOpen, Gavel, Globe, GraduationCap, Hand, HardDrive, HeartHandshake, Image, Info,
  Keyboard, LayoutDashboard, LayoutGrid, Layers, Lightbulb, ListChecks, Lock, Mail,
  MessageSquare, MessagesSquare, Monitor, Paperclip, PenLine, Plug, Presentation, Quote,
  Rocket, Scale, Search, ShieldCheck, Sparkles, Table2, Target, Telescope, TrendingUp, Upload,
  User, UserCheck, Video, Workflow,
} from 'lucide-react';

// Short names used in the content files (src/sections, src/data) -> icon components.
const ICONS = {
  badge: BadgeCheck, bell: Bell, book: BookOpen, bot: Bot, briefcase: Briefcase,
  building: Building2, calendar: CalendarClock, cap: GraduationCap, chart: BarChart3,
  chat: MessageSquare, check: CheckCircle2, code: Code2, copy: Copy, drive: HardDrive,
  eye: Eye, file: FileText, fileCheck: FileCheck, filePlus: FilePlus2, fileSearch: FileSearch,
  flask: FlaskConical, folder: FolderOpen, gavel: Gavel, globe: Globe, grid: LayoutGrid,
  hand: Hand, heart: HeartHandshake, image: Image, info: Info, keyboard: Keyboard,
  layers: Layers, layout: LayoutDashboard, lightbulb: Lightbulb, list: ListChecks, lock: Lock,
  mail: Mail, messages: MessagesSquare, monitor: Monitor, paperclip: Paperclip, pen: PenLine,
  plug: Plug, quote: Quote, rocket: Rocket, scale: Scale, search: Search, shield: ShieldCheck,
  slides: Presentation, sparkles: Sparkles, table: Table2, tabs: AppWindow, target: Target,
  telescope: Telescope, trending: TrendingUp, upload: Upload, user: User, userCheck: UserCheck,
  video: Video, workflow: Workflow,
};

export default function Icon({ name, size = 48, strokeWidth = 1.75, ...rest }) {
  const Cmp = ICONS[name] || Sparkles;
  return <Cmp size={size} strokeWidth={strokeWidth} aria-hidden="true" {...rest} />;
}
