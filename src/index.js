import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Switch from "react-switch";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import { Icon, Input } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const colors = {
    world: '#7C4FFF',
    politics: '#419488',
    business: '#4696EC',
    technology: '#CEDC3A',
    sport: '#F7C244',
    other: '#6E757B',
    guardian: '#14284A',
    nytimes: '#DDDDDD'
}

const text = {
    world: 'white',
    politics: 'white',
    business: 'white',
    technology: 'black',
    sport: 'black',
    other: 'white',
    guardian: 'white',
    nytimes: 'black'
}

const SectionTag = props => (
    <p 
        className="section-tag" 
        style={colors[props.section] !== undefined ? 
            { backgroundColor: colors[props.section], color: text[props.section] } : 
            { backgroundColor: colors['other'], color: text['other'] }}
    ><b>
        {props.section.toUpperCase()}
    </b></p>
);

const SwitchButton = () => {
    const [state, setState] = React.useState(true);
    const toggleChecked = () => {
        setState((previous) => !previous);
    };

    return (
        <>
            <span className="source-toggle-title">&nbsp;&nbsp;NYTimes&nbsp;&nbsp;&nbsp;</span>
            <Switch 
                uncheckedIcon={false} 
                checkedIcon={false} 
                className="react-switch" 
                onColor="#08f" 
                onChange={toggleChecked} 
                checked={state}
            />
            <span className="source-toggle-title">&nbsp;&nbsp;&nbsp;&nbsp;Guardian</span>
        </>
    );
}

const NavigationBar = () => (
    <>
    <Navbar variant="dark" sticky={true} id="navigation-bar">
        <Form inline>
            <Input icon="angle down" type="text" placeholder="Enter keyword..." className="search-text-box" />
        </Form>
        <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#world">World</Nav.Link>
        <Nav.Link href="#politics">Politics</Nav.Link>
        <Nav.Link href="#business">Business</Nav.Link>
        <Nav.Link href="#technology">Technology</Nav.Link>
        <Nav.Link href="#sports">Sports</Nav.Link>
        </Nav>
        <Icon inverted color="grey" size="large" name="bookmark outline" />
        <SwitchButton />
    </Navbar>
    </>
);

const ArticleCard = props => {

    const notify = () => {
        toast("It Works!");
    }

    return (
        <div className="card-row">
            <div className="headline-card">
                <img alt="" src={props.img_url} />
                <div className="headline-container">
                    <div className="title-container">
                        <h5 className="article-title"><b>{props.title}</b></h5>
                        <Icon onClick={notify} name="share alternate" />
                        <ToastContainer />
                    </div>
                    <p>{props.description}...</p>
                    <div className="bottom-card-info">
                        <p className="date-tag"><i>{props.date}</i></p><SectionTag section={props.section} />
                    </div>
                </div>
            </div>
        </div>
    );
}

class Headlines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:5000/guardian")
            .then(result => result.json())
            .then(articles => this.setState({articles}, () => console.log(this.state)));
    }

    render = () => {
        const { articles } = this.state;
        if (articles.length === 0) {
            return (
                <div>Loading...</div>
            );
        } else {
            return (
                <div>
                    {articles.map((article) =>
                        <ArticleCard 
                            key={article.key} 
                            img_url={article.img} 
                            title={article.title} 
                            description={article.description} 
                            date={article.date}
                            section={article.section}
                        />
                    )}
                </div>
            );
        }
    }
}

const HomePage = () => (
    <>
    <NavigationBar />
    <div className="main-container">
        <Headlines />
    </div>
    </>
);

ReactDOM.render(
    <HomePage />, document.getElementById('root')
);