export default function Profile() {
  return (
    <div>
      <h1>Profil</h1>
      <div>
        <div className="menu-avatar">
          {user?.user_metadata?.first_name?.charAt(0) +
            user?.user_metadata?.last_name?.charAt(0) || "U"}
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
}
