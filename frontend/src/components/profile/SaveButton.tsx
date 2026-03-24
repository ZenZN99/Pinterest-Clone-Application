interface PropsSaveButton {
  handleSave: () => void;
  loading: boolean;
}

const SaveButton = ({ handleSave, loading }: PropsSaveButton) => {
  return (
    <div>
      <button
        onClick={handleSave}
        disabled={loading}
        className="px-6 py-3 bg-[red] text-white rounded-full hover:bg-[#d80000] transition w-fit"
      >
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </div>
  );
};

export default SaveButton;
