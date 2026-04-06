import { useEffect, useState } from "react";
const avaurl = "https://joeschmoe.io/api/v1/";

function Avatarlist(props) {
  const [likes, setLikes] = useState(0);
  const [editName, setEditName] = useState(props.name);
  const [editWork, setEditWork] = useState(props.work);
  useEffect(() => {
    setEditName(props.name);
    setEditWork(props.work);
  }, [props.name, props.work]);

  const modalId = `modal-${props.id}`;
  const editModalId = `edit-${props.id}`;

  return (
    <div>
      <div className="card bg-base-100 shadow-xl hover:scale-105 transition-transform">
        <figure className="px-6 pt-6">
          <img
            src={`${avaurl}${props.name}`}
            alt={props.name}
            className="w-40 h-40 rounded-full object-cover"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{props.name}</h2>
          <p className="text-sm text-muted">{props.work}</p>
          <div className="card-actions mt-4">
            <button
              className="btn btn-sm"
              onClick={() => setLikes((l) => l + 1)}
            >
              👍 {likes}
            </button>
            <label
              htmlFor={editModalId}
              className="btn btn-sm"
              onClick={() => {
                setEditName(props.name);
                setEditWork(props.work);
              }}
            >
              Edit
            </label>
            <button
              className="btn btn-sm btn-error"
              onClick={() => props.onRemove(props.id)}
            >
              Remove
            </button>
            <label htmlFor={modalId} className="btn btn-sm">
              Details
            </label>
          </div>
        </div>
      </div>

      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{props.name}</h3>
          <p className="py-4">Work: {props.work}</p>
          <div className="modal-action">
            <label htmlFor={modalId} className="btn">
              Close
            </label>
          </div>
        </div>
      </div>

      <input type="checkbox" id={editModalId} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit {props.name}</h3>
          <input
            className="input input-bordered w-full mt-4"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <input
            className="input input-bordered w-full mt-2"
            value={editWork}
            onChange={(e) => setEditWork(e.target.value)}
          />
          <div className="modal-action">
            <label
              htmlFor={editModalId}
              className="btn btn-primary"
              onClick={() =>
                props.onEdit && props.onEdit(props.id, editName, editWork)
              }
            >
              Save
            </label>
            <label htmlFor={editModalId} className="btn btn-ghost">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Avatarlist;
