// Denna komponent ansvarar för att visa information om en enskild medlem.
// Den tar emot ett member-objekt som en prop.
export function MemberItem({ member }) {
  if (!member) {
    return null; 
  }

  return (
    <li className="member-item">
      <span className="member-name">{member.name}</span> -{' '}
      <span className="member-role">{member.role}</span>
    </li>
  );
}

