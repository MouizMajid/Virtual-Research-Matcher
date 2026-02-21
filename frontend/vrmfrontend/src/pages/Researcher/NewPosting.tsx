import { useEffect } from "react";
import {Controller,  useForm, useWatch } from "react-hook-form";
import UserHeader from "../../components/UserHeader";

type FormValues = {
    type: "project" | "position";
  title: string;
  category: string;
  location: string;
  remote: boolean;
  positions: number;
  stipend: string;
  deadline: string;
  duration: string;
  shortDescription: string;
  fullDescription: string;
  requirements: string;
  tags: string;
};

const NewPosting = () => {
  useEffect(() => {
    document.title = "New Posting - ResearchConnect";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm<FormValues>({
    defaultValues: {
        type: "project",
      title: "",
      category: "",
      location: "",
      remote: false,
      positions: 1,
      stipend: "",
      deadline: "",
      duration: "",
      shortDescription: "",
      fullDescription: "",
      requirements: "",
      tags: "",
    },
  });
  const selectedType = useWatch({
    control,
    name: "type",
  });

  const onSubmit = (data: FormValues) => {
    const payload = {
      ...data,
      tags: data.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    console.log("Publish posting", payload);
    alert("Publish clicked — form data logged to console.");
  };

  const onSaveDraft = () => {
    const data = getValues();
    console.log("Save draft", data);
    alert("Save draft clicked — draft data logged to console.");
  };

  return (
    <div className="page">
      <UserHeader />

      <main className="container-page py-8">
        <div className="stack gap-6">
          <div className="row justify-between">
            <div className="stack gap-1">
              <h1 className="h2">New Posting</h1>
              <p className="muted">Create and publish a new research job or project posting.</p>
            </div>

            <div className="row gap-2">
              <button onClick={onSaveDraft} className="btn btn-ghost">
                Save Draft
              </button>
              <button onClick={handleSubmit(onSubmit)} className="btn btn-primary">
                Publish
              </button>
            </div>
          </div>

          <form className="card card-pad grid gap-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-3 gap-4">
                <div>
                <label className="label">Is this a Project or Position?</label>
                <Controller name="type" control={control} render={({field}) => (
                <div className="tabs">
                    <button 
                        type="button" 
                        className={`tab ${field.value === "project" ? "tab-active" : ""}`} 
                        onClick={() => field.onChange("project")}
                    >
                        Project
                    </button>
                    <button 
                        type="button" 
                        className={`tab ${field.value === "position" ? "tab-active" : ""}`} 
                        onClick={() =>field.onChange("position")}
                    >
                        Position
                    </button>

                </div>
                )}/>
                </div>

                {selectedType === "project" ? (<div>
                <label className="label">Project Title</label>
                <input
                  className="input"
                  {...register("title", { required: "Title is required" })}
                  placeholder="e.g. Mouse Feeder Project"
                />
                {errors.title && <p className="error">{errors.title.message}</p>}
              </div>) : (<div>
                <label className="label">Position Title</label>
                <input
                  className="input"
                  {...register("title", { required: "Title is required" })}
                  placeholder="e.g. Machine Learning Research Assistant"
                />
                {errors.title && <p className="error">{errors.title.message}</p>}
              </div>)}


              <div>
                <label className="label">Category</label>
                <select className="select" {...register("category", { required: true })}>
                  <option value="">Select a category</option>
                  <option value="ml">Machine Learning</option>
                  <option value="data">Data Science</option>
                  <option value="bio">Biology</option>
                  <option value="chem">Chemistry</option>
                  <option value="other">Other</option>
                </select>
                {errors.category && <p className="error">Category is required</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="label">Location</label>
                <input
                  className="input"
                  {...register("location")}
                  placeholder="City, Institution"
                />
              </div>

              <div>
                <label className="label">Remote</label>
                <div className="row">
                  <input id="remote" type="checkbox" {...register("remote")} />
                  <label htmlFor="remote" className="muted">
                    Allow remote applicants
                  </label>
                </div>
              </div>

              <div>
                <label className="label">{selectedType === "project" ? "Number of Project Members" : "Number of Positions"}</label>
                <input
                  className="input"
                  type="number"
                  {...register("positions", { valueAsNumber: true, min: 1 })}
                />
                {errors.positions && <p className="error">At least 1 position required</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="label">Stipend / Salary <span className="muted ml-2">Optional</span></label>
                <input
                  className="input"
                  {...register("stipend")}
                  placeholder="e.g. $1500 / month or unpaid"
                />
              </div>

              <div>
                <label className="label">Duration</label>
                <input
                  className="input"
                  {...register("duration")}
                  placeholder="e.g. 3 months, 1 year"
                />
              </div>

              <div>
                <label className="label">Application Deadline</label>
                <input className="input" type="date" {...register("deadline")} />
              </div>
            </div>


            <div>
              <label className="label">Short Description</label>
              <input
                className="input"
                {...register("shortDescription")}
                placeholder="One-line summary for listing"
              />
            </div>

            <div>
              <label className="label">Full Description</label>
              <textarea
                className="input"
                {...register("fullDescription")}
                style={{ minHeight: 160 }}
                placeholder="Describe the role, responsibilities, and ideal candidate."
              />
            </div>

            <div>
              <label className="label">Requirements / Qualifications</label>
              <textarea
                className="input"
                {...register("requirements")}
                placeholder="List required skills, degrees, or experience."
              />
            </div>

            <div>
              <label className="label">Tags (comma separated)</label>
              <input
                className="input"
                {...register("tags")}
                placeholder="e.g. python, deep learning, statistics"
              />
            </div>

            <div className="row justify-end gap-2">
              <button type="button" onClick={onSaveDraft} className="btn btn-ghost">
                Save Draft
              </button>
              <button type="submit" className="btn btn-primary">
                Publish
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default NewPosting;
