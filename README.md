# 📋 TaskMate — Student Homework & Deadline Manager

A full-stack web application designed to help university students manage homework assignments, track deadlines, and organize coursework efficiently. Built with modern web technologies and real-time data synchronization.

**🔗 Live Demo:** [taskmate-app.vercel.app](https://taskmate-app.vercel.app)

---

## ✨ Features

- **👤 User Authentication**
  - Secure sign-up and login with personal accounts
  - Password reset functionality
  - Session persistence across browser refreshes

- **📊 Smart Dashboard**
  - Overview of all assignments at a glance
  - Statistics showing total tasks, completed, pending, and overdue
  - Quick-view of urgent/overdue assignments
  - Real-time updates as you manage tasks

- **✅ Task Management**
  - Create, edit, and delete assignments
  - Set deadlines and priority levels
  - Add detailed descriptions and notes
  - Track task status (pending, in progress, completed)

- **🎯 Advanced Filtering & Organization**
  - Filter tasks by subject, status, and priority
  - Sort by deadline, priority, or creation date
  - Color-coded subjects for visual organization
  - Quick toggle between different views

- **🎨 Subject Management**
  - Create custom subjects/courses
  - Assign colors to each subject for easy identification
  - Organize all assignments by course

- **🌓 Dark & Light Mode**
  - Toggle between themes based on preference
  - Automatically saves theme preference
  - Reduces eye strain during long study sessions

---

## 🛠 Technology Stack

### Frontend
- **React.js** — UI library with hooks and functional components
- **React Router** — Client-side routing for multi-page navigation
- **Context API** — State management (no Redux overhead)
- **Vite** — Fast build tool and dev server
- **CSS** — Custom styling with responsive design

### Backend & Database
- **Supabase** — PostgreSQL database + authentication + real-time API
- **Supabase Auth** — User authentication & session management
- **Supabase Realtime** — Live data synchronization across clients

### Deployment
- **Vercel** — Fast, serverless hosting for React applications
- **GitHub** — Version control and deployment integration

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- A Supabase account ([create one here](https://supabase.com))

### Clone & Install

```bash
# Clone the repository
git clone https://github.com/Thalex35/Taskmate-app.git
cd Taskmate-app

# Install dependencies
npm install
```

### Configure Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from:
1. Go to [Supabase Console](https://app.supabase.com)
2. Select your project
3. Click **Settings** → **API**
4. Copy `URL` and `anon` key

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## 📖 Usage

### Getting Started
1. **Sign Up** — Create a new account with your email
2. **Create a Subject** — Add your courses/subjects with custom colors
3. **Add Tasks** — Create assignments with deadlines and priorities
4. **Manage Tasks** — Update status, edit, or delete as needed
5. **Track Progress** — Monitor completion on the dashboard

### Example Workflow
1. Register at the login page
2. Add subjects: "Introduction to Algorithms", "Web Development", "Database Systems"
3. Create tasks:
   - Subject: Web Development
   - Title: "Build responsive landing page"
   - Deadline: 2026-09-15
   - Priority: High
4. View on dashboard → Mark as completed → Celebrate! 🎉

---

## 📂 Project Structure

```
taskmate-app/
├── src/
│   ├── components/        # Reusable React components
│   │   ├── Dashboard.jsx
│   │   ├── TaskForm.jsx
│   │   ├── TaskList.jsx
│   │   └── ...
│   ├── pages/             # Page components (routed)
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── ...
│   ├── context/           # Context API setup
│   │   ├── TaskContext.js
│   │   ├── AuthContext.js
│   │   └── ThemeContext.js
│   ├── services/          # Supabase queries & API calls
│   │   ├── supabaseClient.js
│   │   ├── taskService.js
│   │   └── authService.js
│   ├── styles/            # Global & component styles
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── public/                # Static assets
├── .env.local             # Environment variables (local)
├── package.json           # Dependencies & scripts
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

---

## 🔐 Key Architectural Decisions

### Why Context API?
- Simplicity: No boilerplate like Redux
- Sufficient for this app's state complexity
- Easier for junior developers to understand
- Reduces bundle size

### Why Supabase?
- **Authentication:** Built-in user management with row-level security
- **Database:** PostgreSQL with real-time subscriptions
- **API:** Auto-generated REST + Realtime APIs
- **Hosting:** Managed backend reduces operational overhead

### Real-Time Updates
- Uses Supabase Realtime to sync data across browser tabs
- When you update a task in one tab, it reflects instantly in others
- Subscription cleanup prevents memory leaks

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [Vercel.com](https://vercel.com)
3. Click **"New Project"**
4. Select your repository
5. Set environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click **Deploy**

Vercel automatically deploys on every GitHub push. ✨

### Deploy to Other Platforms

**Netlify:**
```bash
npm run build
# Deploy the 'dist' folder to Netlify
```

**Self-hosted:**
```bash
npm run build
# Serve the 'dist' folder with any static hosting (Nginx, Apache, etc.)
```

---

## 📊 Database Schema

The application uses these core Supabase tables:

```sql
-- Users (managed by Supabase Auth)
profiles
├── id (UUID)
├── email (string)
├── display_name (string)
├── created_at (timestamp)
└── updated_at (timestamp)

-- Courses/Subjects
subjects
├── id (UUID)
├── user_id (UUID) — References auth.users
├── name (string)
├── color (string) — Hex color code
├── created_at (timestamp)
└── updated_at (timestamp)

-- Assignments/Tasks
tasks
├── id (UUID)
├── user_id (UUID) — References auth.users
├── subject_id (UUID) — References subjects
├── title (string)
├── description (text, optional)
├── deadline (timestamp)
├── priority (enum: low, medium, high)
├── status (enum: pending, in_progress, completed)
├── created_at (timestamp)
└── updated_at (timestamp)
```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Sign up with new email
- [ ] Log in with credentials
- [ ] Create a subject
- [ ] Add a task with deadline
- [ ] Edit task details
- [ ] Change task status to completed
- [ ] Filter tasks by subject
- [ ] Filter tasks by priority
- [ ] Toggle dark/light mode
- [ ] Log out & log back in (verify session persists)
- [ ] Open in two browser tabs (verify real-time updates)

### Common Issues & Fixes

**"Cannot connect to Supabase"**
- Check that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
- Restart dev server: `npm run dev`

**"Authentication fails after deployment"**
- Verify Supabase Auth URL settings allow your Vercel domain
- Check `.env.local` vs `.env.production` values

**"Tasks not syncing in real-time"**
- Clear browser cache
- Check Supabase Realtime is enabled in project settings

---

## 👥 Team & Contributors

| Name | Role | Contributions |
|------|------|---|
| **Theodore Louisjuste** | Full-Stack Developer | React UI, Supabase integration, authentication, dashboard |
| **Shadaie Lozier** | Developer | Task management features, filtering logic |
| **Rosar** | Developer | UI/UX refinement, dark mode, subject management |

---

## 📝 Future Enhancements

- [ ] Email reminders for upcoming deadlines
- [ ] File attachments for tasks (upload PDFs, images)
- [ ] Collaborative tasks (share assignments with classmates)
- [ ] Calendar view of assignments
- [ ] Progress analytics (completion rate, time spent)
- [ ] Export tasks to PDF or CSV
- [ ] Mobile app (React Native)
- [ ] Browser notifications for overdue tasks

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork** the repository
2. **Create a branch:** `git checkout -b feature/your-feature-name`
3. **Commit changes:** `git commit -m "Add feature: your feature"`
4. **Push branch:** `git push origin feature/your-feature-name`
5. **Open a Pull Request** with a clear description

### Code Style
- Use functional components and hooks
- Follow React naming conventions (PascalCase for components)
- Add comments for complex logic
- Keep components small and reusable

---

## 🐛 Bug Reports & Support

Found a bug? Have a suggestion?

- **GitHub Issues:** [Create an issue](https://github.com/Thalex35/Taskmate-app/issues)
- **Email:** louisjustetheodore@gmail.com
- **WhatsApp:** +509 46 56 49 03

---

## 📚 Learning Resources

If you want to understand how this project works:

1. **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)
2. **React Hooks Guide:** [react.dev/reference/react](https://react.dev/reference/react)
3. **Context API:** [react.dev/learn/passing-data-deeply-with-context](https://react.dev/learn/passing-data-deeply-with-context)
4. **Vite Guide:** [vitejs.dev](https://vitejs.dev)

---

## 💡 Tips for Developers

- **Hot Module Reload:** Vite automatically refreshes changes without losing state
- **Supabase Inspector:** Use `supabase-js` console logs to debug queries
- **React DevTools:** Install [React DevTools extension](https://chrome.google.com/webstore) for easier debugging
- **Network Tab:** Check browser DevTools → Network to monitor API calls to Supabase

---

## 🙏 Acknowledgments

- **Supabase** — Simplifying backend infrastructure
- **Vercel** — Effortless deployment
- **React team** — Amazing library and documentation
- **Our users** — For testing and feedback

---

**Made with ❤️ by the TaskMate Team**

Built as the final project for Web Design Bootcamp | Sept 2026
