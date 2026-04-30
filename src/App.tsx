
import { Hero } from './components/sections/Hero';
import { ProjectsGallery } from './components/sections/ProjectsGallery';
import { TechStack } from './components/sections/TechStack';
import { Footer } from './components/sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white">
      <main>
        <Hero />
        <ProjectsGallery />
        <TechStack />
      </main>
      <Footer />
    </div>
  );
}

export default App;
