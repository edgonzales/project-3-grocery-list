import { Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function PageHeader({ handleLogout }) {
    
    return (
        <Segment textAlign='right'>
            <Link 
                onChange={handleLogout}
                
            >
                Logout
            </Link>
        </Segment>
    )
}