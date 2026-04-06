import { Component } from "react";
import Avatarlist from "./Avatarlist.jsx";

class Avatar extends Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome to Avatar World",
      searchTerm: "",
      theme: "light",
      avatars: [
        { id: 1, name: "PS Shuvo", work: "Front End Developer" },
        { id: 2, name: "Shovo Pd", work: "UI/UX Developer" },
        { id: 3, name: "Shuvro Hr", work: "Cyber Security Expert" },
        { id: 4, name: "Gobinda Kr", work: "IT Expert" },
      ],
    };
  }

  componentDidMount() {
    try {
      const raw = localStorage.getItem("avatars");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) this.setState({ avatars: parsed });
      }
    } catch (e) {
      // ignore
    }
  }

  setAvatarsAndPersist = (avatars) => {
    this.setState({ avatars });
    try {
      localStorage.setItem("avatars", JSON.stringify(avatars));
    } catch (e) {}
  };

  handleChange = () => {
    this.setState({
      title: "Thanks for Subscribe",
    });
  };

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleThemeToggle = () => {
    this.setState({
      theme: this.state.theme === "light" ? "dark" : "light",
    });
  };

  addRandomAvatar = () => {
    const id = Date.now();
    const names = ["Alex", "Jordan", "Taylor", "Sam", "Casey", "Riley"];
    const works = ["Engineer", "Designer", "DevOps", "Analyst", "Manager"];
    const name =
      names[Math.floor(Math.random() * names.length)] + id.toString().slice(-3);
    const work = works[Math.floor(Math.random() * works.length)];
    this.setAvatarsAndPersist([...this.state.avatars, { id, name, work }]);
  };

  removeAvatar = (id) => {
    this.setAvatarsAndPersist(this.state.avatars.filter((a) => a.id !== id));
  };

  editAvatar = (id, name, work) => {
    const updated = this.state.avatars.map((a) =>
      a.id === id ? { ...a, name, work } : a,
    );
    this.setAvatarsAndPersist(updated);
  };

  render() {
    const filteredData = this.state.avatars.filter(
      (item) =>
        item.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
        item.work.toLowerCase().includes(this.state.searchTerm.toLowerCase()),
    );

    return (
      <div
        data-theme={this.state.theme}
        className="min-h-screen bg-base-200 py-8"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold font-gugi">{this.state.title}</h1>
            <div className="flex gap-2">
              <button
                className="btn btn-outline"
                onClick={this.handleThemeToggle}
              >
                Toggle Theme
              </button>
              <button
                className="btn btn-primary"
                onClick={this.addRandomAvatar}
              >
                Add Random
              </button>
            </div>
          </div>

          <div className="flex mb-6 gap-4">
            <input
              type="text"
              placeholder="Search avatars..."
              className="input input-bordered w-full max-w-md"
              value={this.state.searchTerm}
              onChange={this.handleSearch}
            />
            <button className="btn btn-secondary" onClick={this.handleChange}>
              Subscribe
            </button>
          </div>

          {filteredData.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted">No avatars found.</p>
              <button
                className="btn btn-primary mt-4"
                onClick={this.addRandomAvatar}
              >
                Add one
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredData.map((avatarcard) => (
                <Avatarlist
                  key={avatarcard.id}
                  id={avatarcard.id}
                  name={avatarcard.name}
                  work={avatarcard.work}
                  onRemove={this.removeAvatar}
                  onEdit={this.editAvatar}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Avatar;
