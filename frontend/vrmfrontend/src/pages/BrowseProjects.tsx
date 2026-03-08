import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { ProjectCard } from "../components/ProjectCard";
import { mockProjects } from "../data/mockData";

const techFilters = ["Python", "TensorFlow", "NLP", "Blockchain", "Computer Vision", "R", "C++"];
const locationFilters = ["Remote", "On-site", "Hybrid"];

export default function BrowseProjects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);

  const filteredProjects = mockProjects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTech = selectedTech.length === 0 || p.tags.some((t) => selectedTech.includes(t));
    const matchesLocation = selectedLocation.length === 0 ||
      selectedLocation.some((loc) => p.location.toLowerCase().includes(loc.toLowerCase()));
    return matchesSearch && matchesTech && matchesLocation;
  });

  const toggleFilter = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Browse Research Projects</h1>
        <p className="mt-1 text-muted-foreground">Discover opportunities that match your skills and interests.</p>
      </div>
      
      <div className="flex gap-8">
        {/* Filter Sidebar */}
        <aside className="w-64 shrink-0">
          <div className="glass-card p-5 space-y-6 sticky top-24">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </div>

            <div>
              <h3 className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Tech Stack</h3>
              <div className="space-y-1.5">
                {techFilters.map((tech) => (
                  <label key={tech} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTech.includes(tech)}
                      onChange={() => toggleFilter(selectedTech, setSelectedTech, tech)}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    {tech}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Location</h3>
              <div className="space-y-1.5">
                {locationFilters.map((loc) => (
                  <label key={loc} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedLocation.includes(loc)}
                      onChange={() => toggleFilter(selectedLocation, setSelectedLocation, loc)}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    {loc}
                  </label>
                ))}
              </div>
            </div>

            {(selectedTech.length > 0 || selectedLocation.length > 0) && (
              <button
                onClick={() => { setSelectedTech([]); setSelectedLocation([]); }}
                className="text-xs text-primary hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects by title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 w-full rounded-xl border border-input bg-card pl-11 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <p className="mb-4 text-sm text-muted-foreground">{filteredProjects.length} projects found</p>

          <div className="grid grid-cols-2 gap-4">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">
              <p className="text-lg font-medium">No projects found</p>
              <p className="text-sm">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
