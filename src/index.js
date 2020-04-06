import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Switch from "react-switch";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { Icon, Input } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from "react-share";
import { EmailIcon, FacebookIcon, TwitterIcon } from "react-share";
import BounceLoader from "react-spinners/BounceLoader";
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

const SwitchButton = props => {
    const [state, setState] = React.useState(true);
    const toggleChecked = () => {
        setState((previous) => !previous);
        if(state === false) {
            props.data.changePage("Main-Page-Guardian");
        }
        else if(state === true) {
            props.data.changePage("Main-Page-NY");
        }
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
                data={props.data}
            />
            <span className="source-toggle-title">&nbsp;&nbsp;&nbsp;&nbsp;Guardian</span>
        </>
    );
}

const NavigationBar = props => (
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
        <SwitchButton data={props.data} />
    </Navbar>
    </>
);

const ShareTab = props => (
    <>
        <h5>{props.title}</h5>
        <hr></hr>
        <p>Share via</p>
        <FacebookShareButton hashtag="#CSCI_571_NewsApp" url={props.url} className="share-button">
            <FacebookIcon round={true} size={50} />
        </FacebookShareButton>
        <TwitterShareButton url={props.url} hashtags={["CSCI_571_NewsApp"]} className="share-button">
            <TwitterIcon round={true} size={50} />
        </TwitterShareButton>
        <EmailShareButton url={props.url} subject="CSCI_571_NewsApp" className="share-button">
            <EmailIcon round={true} size={50} />
        </EmailShareButton>
    </>
);

class ArticleCard extends Component {

    constructor(props) {
        super(props);
        this.share = this.share.bind(this);
    }
    
    share() {
        toast(<ShareTab title={this.props.title} url={this.props.url} />, { className: "share-tab" });
    }

    render () {
        return (
            <div className="card-row">
                <div className="headline-card">
                    <Image src={this.props.img_url} thumbnail />
                    <div className="headline-container">
                        <div className="title-container">
                            <h5 className="article-title"><b>{this.props.title}</b></h5>
                            <Icon name="share alternate" onClick={this.share} />
                        </div>
                        <p>{this.props.description}...</p>
                        <div className="bottom-card-info">
                            <p className="date-tag"><i>{this.props.date}</i></p><SectionTag section={this.props.section} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class GuardianHeadlines extends Component {
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
                <>
                    <div className="bounce-loader">
                        <BounceLoader
                            size={60}
                            color={"#123abc"}
                            loading={true}
                        />
                    </div>
                    <h4><b>Loading</b></h4>
                </>
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
                            url={article.url}
                        />
                    )}
                </div>
            );
        }
    }
}

class NYHeadlines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:5000/nytimes")
            .then(result => result.json())
            .then(articles => this.setState({articles}, () => console.log(this.state)));
    }

    render = () => {
        const { articles } = this.state;
        if (articles.length === 0) {
            return (
                <>
                    <div className="bounce-loader">
                        <BounceLoader
                            size={60}
                            color={"#123abc"}
                            loading={true}
                        />
                    </div>
                    <h4><b>Loading</b></h4>
                </>
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
                            url={article.url}
                        />
                    )}
                </div>
            );
        }
    }
}

class MainComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { page: "Main-Page-Guardian" };
    }

    changePage(newPage) {
        this.setState({ page: newPage });
        this.forceUpdateHandler();
    }

    forceUpdateHandler() {
        this.forceUpdate();
    }

    render = () => {
        if(this.state.page === "Main-Page-Guardian") {
            return (
                <>
                    <NavigationBar data={{ page: this.state.page, changePage: this.changePage.bind(this) }} />
                    <div className="main-container">
                        <GuardianHeadlines page={this.state.page} />
                        <ToastContainer closeOnClick={false} autoClose={false} position="top-center" transition={Slide} />
                    </div>
                </>
            );
        }
        else if(this.state.page === "Main-Page-NY") {
            return (
                <>
                    <NavigationBar data={{ page: this.state.page, changePage: this.changePage.bind(this) }} />
                    <div className="main-container">
                        <NYHeadlines page={this.state.page} />
                        <ToastContainer closeOnClick={false} autoClose={false} position="top-center" transition={Slide} />
                    </div>
                </>
            );
        }
    }
}

const HomePage = () => (
    <>
        <MainComponent />
    </>
);

ReactDOM.render(
    <HomePage />, document.getElementById('root')
);