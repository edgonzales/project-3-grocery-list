import { Segment, Button} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function PageHeader({ handleLogout }) {

    return (
        <Segment textAlign='right'>
            <Link
                onClick={handleLogout}
            >
                Logout
            </Link>
            <Button>
                Add Product
            </Button>
        </Segment>
    )
}