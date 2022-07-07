import './Sidebar.scss';
import { IoClose } from "react-icons/io5";
// import 'react-pro-sidebar/dist/css/styles.css';
import { connect } from "react-redux";
import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { Hub } from "@aws-amplify/core";
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box } from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import {
  getSites,
  createSite,
  getMe
} from '../actions/todo';
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');


class Sidebar extends Component {
  static logout() {
    Auth.signOut().then(() => {
      Hub.dispatch("UI Auth", {
        event: "AuthStateChange",
        message: "signedout",
      });
    });
  }

  static searchTxt(event) {
    const txt = event.target.value.toLowerCase();
    this.setState({ siteSearchTxt: txt });
    if (txt !== '') {
      const filteredSites = this.props.sites.filter(site => site.name.toLowerCase().includes(txt))
      this.setState({ filteredSites });
    } else {
      this.setState({ filteredSites: this.props.sites });
      // If the text field is empty, show all users
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      // collapsed: this.props.collapsed,
      showModal: false,
      newSiteName: '',
      newSiteAddress1: '',
      newSiteAddress2: '',
      isLoading: false,
      toastOptions: {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      },
      userInfo: {},
      // selectedSiteId: null,
      filteredSites: this.props.sites,
      siteSearchTxt: '',
    }
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    Auth.currentAuthenticatedUser().then(info => {
      if (info) {
        if (info.attributes) {
          this.setState({ userInfo: info.attributes });
        }
      }
    })
    this.props.fetchSites();
    this.props.fetchMe();
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextprops) {
    const txt = this.state.siteSearchTxt
    if (txt !== '') {
      const filteredSites = nextprops.sites.filter(site => site.name.toLowerCase().includes(txt))
      this.setState({ filteredSites });
    } else {
      this.setState({ filteredSites: nextprops.sites });
      // If the text field is empty, show all users
    }
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  // Site Modal
  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleInputChange(event) {
    const {target} = event;
    const {value} = target;
    const {name} = target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.newSiteName, this.state.newSiteAddress1, this.state.newSiteAddress2);
    const data = {
      name: this.state.newSiteName,
      address1: this.state.newSiteAddress1,
      address2: this.state.newSiteAddress2,
      customerId: this.props.me.customerId
    }
    this.setState({ isLoading: true });
    this.props.createSite(data).then(() => {
      this.handleCloseModal();
      toast.success('Create Site Successfully', this.state.toastOptions);
      setTimeout(() => {
        this.props.fetchSites();
        this.props.fetchMe();
        this.setState({ isLoading: false });
      }, 500);
    });

    event.preventDefault();
  }

  static onClickSiteList() {
    console.log('onClickSiteList');
  }

  toggleCollapse() {
    this.props.handleCollapsedChange(!this.props.collapsed)
  }

  render() {
    return (
      <div>
        <Box disablePadding
        visible={this.state.isLoading}
        >
          <List style={{left: '0px', width: '100%'}} dense>
            <ListItem>
              <ListItemButton>
                <PersonRoundedIcon />
                <ListItemText primary={this.state.userInfo.email} />
              </ListItemButton>
            </ListItem>
            {
              this.state.filteredSites.map((site) => (
                <ListItem key={`menu-site-${site.id}`} title={site.address1}>
                  <ListItemButton
                  selected={0}
                  onClick={this.onClickSiteList}>
                    <ListItemIcon sx={{left: '0px', minWidth: '20px'}}>
                      <LocationOnRoundedIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText
                      primary={site.name || 'No Name'}
                      primaryTypographyProps={{fontSize: '0.8rem'}}
                    >
                      {/* <NavLink
                        style={({ isActive }) => ({
                            color: isActive ? "dodgerblue" : ""
                          })}
                        to={`/sites/${  site.id}`}>{site.name || 'No Name'}
                      </NavLink> */}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))
            }
          </List>
        </Box>
        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          // style={customStyles}
          className="Modal"
          overlayClassName="Overlay"
          contentLabel="Example Modal"
        >
          <div className="modal-title">Create Site</div>
          <div className="modal-close-btn" onClick={() => {}} onKeyDown={this.handleCloseModal} aria-hidden="true"><IoClose size='24px' /></div>
          <form onSubmit={this.handleSubmit}>
            <div className="modal-contents">

              <div className="modal-item">
                <div className="modal-label">Site Name</div>
                <div className="modal-content">
                  <input type="text" name="newSiteName" placeholder="Site Name" onChange={this.handleInputChange} />
                </div>
              </div>
              <div className="modal-item">
                <div className="modal-label">Site Address</div>
                <div className="modal-content">
                  <input className="mb-7" type="text" name="newSiteAddress1" placeholder="Site Address" onChange={this.handleInputChange} />
                  <input type="text" placeholder="Site Address 2" name="newSiteAddress2" onChange={this.handleInputChange} />
                </div>
              </div>

            </div>
            <div className="modal-btn-area">
              <input className="btn btn-white" type="submit" value="Cancel" />
              <input className="btn btn-primary" type="submit" value="Create" />
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}
// watch for changes in the store
const siteBarStateToProps = (state) => ({
    sites: state.siteApi.sites,
    getSitesStatus: state.siteApi.getSitesStatus,
    createSiteStatus: state.siteApi.createSiteStatus,
    me: state.UserApi.me,
  })

const siteBarDispatchToProps = (dispatch) => ({
    fetchSites: () => dispatch(getSites()),
    createSite: (data) => dispatch(createSite(data)),
    fetchMe: () => dispatch(getMe())
  })

export default connect(siteBarStateToProps, siteBarDispatchToProps)(Sidebar);

