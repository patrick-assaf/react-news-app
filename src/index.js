import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Switch from "react-switch";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import { Icon, Input } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

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

const ArticleCard = props => (
    <div className="card-row">
        <div className="headline-card">
            <img alt="" src={props.img_url} />
            <div className="headline-container">
                <h5><b>{props.title}</b></h5>
                <p>{props.description}</p>
            </div>
        </div>
    </div>
);

function cutoff(string) {
    var char = 520;
    if(string.length <= 520) {
        return string;
    }
    else {
        while(string[char] !== ' ' && char < 530) {
            char += 1;
        }
        return string.substring(0, char);
    }
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
                    {articles.response.results.map((article, index) =>
                        article.blocks.main.elements[0].assets.length !== 0 ? 
                        <ArticleCard 
                            key={index} 
                            img_url={article.blocks.main.elements[0].assets[article.blocks.main.elements[0].assets.length-1].file} 
                            title={article.webTitle} 
                            description={cutoff(article.blocks.body[0].bodyTextSummary)} 
                        /> : <ArticleCard 
                            key={index} 
                            img_url="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" 
                            title={article.webTitle} 
                            description={cutoff(article.blocks.body[0].bodyTextSummary)} 
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