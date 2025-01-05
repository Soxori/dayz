import useServerData from "../../Hooks/useServerData";
import "./Mods.css";
import ReactHelmet from "../../Components/ReactHelmet";

export default function Mods() {
  const serverData = useServerData();

  const isLoading = !serverData;

  if (isLoading) {
    return <div className="loading-spinner" />;
  }

  if (!serverData.mods || serverData.mods.length === 0) {
    return <div>No mods found!</div>;
  }

  return (
    <>
      <ReactHelmet
        title="Raiders Refuge | Mods"
        description="Discover top-tier mods for your DayZ PvP experience! Our server integrates the best custom weapons, vehicles, base-building tools, and survival enhancements to elevate your gameplay. Explore our mods and transform your DayZ journey today!"
        keywords="DayZ mods, Custom DayZ weapons, DayZ vehicle mods, DayZ base building, DayZ survival mods, Best DayZ modifications, DayZ PvP enhancements, DayZ server mods, DayZ gameplay upgrades, Modded DayZ server"
      />
      <div className="mods-wrapper">
        <h1 class="mods-title">All available mods on the server</h1>
        <div className="mods-grid">
          {serverData.mods.map((mod, index) => (
            <div key={index} className="mod-item">
              {mod}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
