import './Leaderboard.css';
import { connect } from "react-redux";

const Leaderboard = (props) => {
  return (
    <div className="nav-container">
			<table className="table-container">
				<thead>
					<tr>
						<th>Users</th>
						<th className='answers-head'>Answered</th>
						<th className='questions-head'>Created</th>
					</tr>
				</thead>
				<tbody>
					{Object.values(props.users).map((user,index)=>
                        <tr key={index}>
                            <td className="info-cell">
                                <div>
                                <img alt="" src={user.avatarURL} className="avatar"/>
                                
                                <span className="user-name">{user.name}</span><br></br>
                                <span className="user-id">{user.id}</span>
                                
                                </div>
                            </td>
                            <td className="answers-cell">
                                 <span>{Object.keys(user.answers).length}</span>
                            </td>
                            <td className="questions-cell">
                                    <span>{user.questions.length}</span>
                            </td>
                        </tr>
                    )}
				</tbody>
			</table>
		</div>
	);
};

const mapStateToProps = ({ questions, users }) => ({
  questions,
  users: Object.values(users).sort((a, b) => Object.keys(b.answers).length + Object.keys(b.questions).length - Object.keys(a.answers).length - Object.keys(a.questions).length),
});
  
export default connect(mapStateToProps)(Leaderboard);
  