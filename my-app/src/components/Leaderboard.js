import { connect } from "react-redux";

const Leaderboard = ({questions, users}) => {
  return (
    <div className="leaderboard-container">
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Users</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(users).map((user, index) => (
              <tr key={index}>
                <td className="leaderboard-cell">
                  <div className="leaderboard-info">
                    <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className="leaderboard-avatar"/>
                    <div>
                      <span className="leaderboard-name">{user.name}</span>
                      <span className="leaderboard-userid">{user.id}</span>
                    </div>
                  </div>
                </td>
                <td className="leaderboard-cell">
                  <span>{Object.keys(user.answers).length}</span>
                </td>
                <td className="leaderboard-cell">
                  <span>{user.questions.length}</span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ questions, users }) => ({
  questions,
  users
});
  
export default connect(mapStateToProps)(Leaderboard);
  