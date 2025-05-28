import { MemberItem } from "./MemberItem"; 


// Den tar emot en array av members som en prop.
export function MemberList({ members }) {
  if (!members || members.length === 0) {
    return <p className="no-members-message">Inga teammedlemmar tillagda ännu.</p>;
  }

  return (
    <div className="member-list-container">
      <h3>Teammedlemmar ({members.length})</h3>
      <ul className="member-list">
        {members.map((member) => (
          <MemberItem key={member.id} member={member} />
        ))}
      </ul>
    </div>
  );
}

