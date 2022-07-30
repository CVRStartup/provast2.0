import { useResumeContext } from "../../../context/ResumeContext";
import { MarkdownSupporter } from "../MarkdownSupporter";

export const ObjectiveDisplay = () => {
  const { resume, objective, setObjective, debounceUpdateResume } = useResumeContext();
  return (
    <div id="objective" className="text-white py-10 border-b-2 border-gray-600">
      <h2 className="mb-5 text-2xl">Objective</h2>
      <label
        htmlFor="summary"
        className="block uppercase tracking-wider text-[10px] font-medium text-gray-400"
      >
        Summary
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <textarea
          type="markdown"
          rows={4}
          name="summary"
          id="summary"
          value={objective || ""}
          onChange={(e) => {
            setObjective(e.target.value);
            debounceUpdateResume({ ...resume, objective: e.target.value });
          }}
          className="flex-1 focus:ring-orange-500 focus:border-orange-500 block w-full min-w-0 rounded-sm sm:text-sm text-gray-900 border-gray-300"
        />
      </div>
      <MarkdownSupporter />
    </div>
  );
};
