import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { ProjectCard } from "../components/ProjectCard";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

interface Posting {
  id: number;
  title: string;
  description: string;
  location: string;
  tags: string[];
  applicationDeadline: string;
  createdByUser: string;
  type: string;
}

const locationFilters = ["Remote", "On-site", "Hybrid"];
const typeFilters = [{ value: "PROJECT", label: "Project" }, { value: "POSITION", label: "Position" }];
const statusFilters = [{ value: "open", label: "Open" }, { value: "closed", label: "Closed" }];

function isOpen(deadline: string) {
  return new Date(deadline) >= new Date();
}

export default function BrowseProjects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  const { data: postings = [], isLoading } = useQuery<Posting[]>({
    queryKey: ["postings"],
    queryFn: () => api.get("/postings").then((r) => r.data),
  });

  // Build unique tag list from actual postings, case-insensitively deduplicated
  const allTags = useMemo(() => {
    const seen = new Map<string, string>();
    postings.forEach((p) => {
      (p.tags || []).forEach((t) => {
        const key = t.toLowerCase();
        if (!seen.has(key)) seen.set(key, t);
      });
    });
    return Array.from(seen.values()).sort((a, b) => a.localeCompare(b));
  }, [postings]);

  const filteredProjects = postings.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      (p.tags || []).some((t) => selectedTags.some((s) => s.toLowerCase() === t.toLowerCase()));

    

    const matchesLocation =
      selectedLocation.length === 0 ||
      selectedLocation.some((loc) => p.location.toLowerCase() === loc.toLowerCase());

    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(p.type);

    const matchesStatus =
      selectedStatus.length === 0 ||
      (selectedStatus.includes("open") && isOpen(p.applicationDeadline)) ||
      (selectedStatus.includes("closed") && !isOpen(p.applicationDeadline));

    return matchesSearch && matchesTags && matchesLocation && matchesType && matchesStatus;
  });

  const toggleFilter = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const hasActiveFilters =
    selectedTags.length > 0 ||
    selectedLocation.length > 0 ||
    selectedTypes.length > 0 ||
    selectedStatus.length > 0;

  const clearAll = () => {
    setSelectedTags([]);
    setSelectedLocation([]);
    setSelectedTypes([]);
    setSelectedStatus([]);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Browse Research Opportunities</h1>
        <p className="mt-1 text-muted-foreground">Discover projects or positions that match your skills and interests.</p>
      </div>

      <div className="flex gap-8">
        {/* Filter Sidebar */}
        <aside className="w-64 shrink-0">
          <div className="glass-card p-5 space-y-6 sticky top-24">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </div>
              {hasActiveFilters && (
                <button onClick={clearAll} className="text-xs text-primary hover:underline">
                  Clear all
                </button>
              )}
            </div>

            {/* Status */}
            <div>
              <h3 className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</h3>
              <div className="space-y-1.5">
                {statusFilters.map((s) => (
                  <label key={s.value} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedStatus.includes(s.value)}
                      onChange={() => toggleFilter(selectedStatus, setSelectedStatus, s.value)}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    {s.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Type */}
            <div>
              <h3 className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</h3>
              <div className="space-y-1.5">
                {typeFilters.map((t) => (
                  <label key={t.value} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(t.value)}
                      onChange={() => toggleFilter(selectedTypes, setSelectedTypes, t.value)}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    {t.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Location */}
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

            {/* Tags */}
            {allTags.length > 0 && (
              <div>
                <h3 className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Tags</h3>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {allTags.map((tag) => (
                    <label key={tag} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTags.some((s) => s.toLowerCase() === tag.toLowerCase())}
                        onChange={() => toggleFilter(selectedTags, setSelectedTags, tag)}
                        className="rounded border-border text-primary focus:ring-primary"
                      />
                      {tag}
                    </label>
                  ))}
                </div>
              </div>
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

          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading projects...</p>
          ) : (
            <>
              <p className="mb-4 text-sm text-muted-foreground">{filteredProjects.length} projects found</p>
              <div className="grid grid-cols-2 gap-4">
                {filteredProjects.map((p) => (
                  <ProjectCard
                    key={p.id}
                    id={p.id}
                    title={p.title}
                    description={p.description}
                    researcher={p.createdByUser}
                    tags={p.tags || []}
                    deadline={p.applicationDeadline}
                    location={p.location}
                    type={p.type}
                  />
                ))}
              </div>
              {filteredProjects.length === 0 && (
                <div className="py-20 text-center text-muted-foreground">
                  <p className="text-lg font-medium">No projects found</p>
                  <p className="text-sm">Try adjusting your filters or search query.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
