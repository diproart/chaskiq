import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import MuiFab from '@material-ui/core/Fab';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import SettingsIcon from '@material-ui/icons/Settings';
import EmailIcon from '@material-ui/icons/Email';
import BookIcon from '@material-ui/icons/Book';
import SmsIcon from '@material-ui/icons/Sms';
import ShuffleIcon from '@material-ui/icons/Shuffle'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle'
import MessageIcon from '@material-ui/icons/Message'
import FilterFramesIcon from '@material-ui/icons/FilterFrames'
import FolderIcon from '@material-ui/icons/Folder'

import QuestionAnswerOutlined from '@material-ui/icons/QuestionAnswerOutlined'
import FlagOutlined from '@material-ui/icons/FlagOutlined'
import BookOutlined from '@material-ui/icons/BookOutlined'
import SettingsOutlined from '@material-ui/icons/SettingsOutlined'
import DomainOutlined from '@material-ui/icons/DomainOutlined'
import DeviceHubOutlined from '@material-ui/icons/DeviceHubOutlined'
import WidgetsIcon from '@material-ui/icons/Widgets'

import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

//import I18n from '../i18n.js.erb'

const styles = theme => ({
  categoryHeader: {
    //paddingTop: 16,
    //paddingBottom: 16,
    //color: theme.palette.common.gray
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.main,
  },
  logo: {
    background: `url(${theme.palette.primary.logo})`,
    width: '86%',
    height: '35px',
    backgroundSize: '87%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '22px',
  },
  item: {
    paddingTop: 4,
    paddingBottom: 4,
    //color: 'rgba(255, 255, 255, 0.7)',
    //color: theme.palette.primary.contrastText,
  },
  itemCategory: {
    backgroundColor: 'transparent',
    //backgroundColor: '#232f3e',
    //boxShadow: '0 -1px 0 #404854 inset',
    boxShadow: `0 -1px 0 rgba(0, 0, 0, .125) inset`,
    paddingTop: 16,
    paddingBottom: 16,
  },
  chaskiq: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    //color: theme.palette.primary.contrastText,
    //backgroundColor: theme.palette.background.paper
  },
  itemActionable: {
    '&:hover': {
      backgroundColor: theme.palette.sidebar.hoverBackground,
    },
  },
  itemActiveItem: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.sidebar.activeBackground
  },
  itemPrimary: {
    color: 'inherit',
    fontSize: theme.typography.fontSize,
    '&$textDense': {
      fontSize: theme.typography.fontSize,
    },
  },
  textDense: {},
  divider: {
    marginTop: theme.spacing(2),
    backgroundColor: 'rgba(58, 56, 56, 0.08)',
  },
  expansionPanelSummary: {
    //display: 'inherit',
    //padding: '0px'
  },
   expansionPanelDetails: {
    display: 'inherit',
    padding: '0px'
  }
});

const ExpansionPanel = withStyles({
  root: {
    backgroundColor: 'transparent',
    color: "inherit",
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 0,
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      borderTop: '1px solid rgba(0, 0, 0, .125)',
    },

    //border: '1px solid rgba(0, 0, 0, .125)',
    //boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    //'&:before': {
    //  display: 'none',
    //},
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    padding: 0,
    backgroundColor: 'transparent'
  },
  expanded: {
    padding: 0,
  },
})(MuiExpansionPanelSummary);


const Fab = withStyles({
  root: {
    boxShadow: '0px 0px 0px',
  }
})(MuiFab);

function Navigator(props, context) {
  const { 
    classes, 
    navigation,
    app, 
    match,
    location,
    visitApp,
    apps,
    onClose,
    ...other 
  } = props;

  const {current_page, current_section} = navigation

  const appid = `/apps/${app.key}`

  const [expanded, setExpanded] = useState(current_section);

  let routerListener = null

  useEffect( () => { 
    setExpanded(current_section) 
  }, [ current_section ] );

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function isActivePage(page){
    ///console.log("selected page", current_page , page)
    return current_page === page
  }

  const categories = [

    {
      id: I18n.t("navigator.platform"),
      icon: <DomainOutlined style={{ fontSize: 30 }}/>,
      children: app.segments.map((o)=>(
        { id: o.name , 
          icon:  null, 
          url: `/apps/${app.key}/segments/${o.id}`,
          active: isActivePage(`segment-${o.id}`)
        }
      ))
    },
    {
      id: I18n.t("navigator.conversations"),
      icon: <QuestionAnswerOutlined style={{ fontSize: 30 }}/>,
      children: [
        { id: 'Conversations', 
          icon:  <SmsIcon/>, 
          url: `/apps/${app.key}/conversations`, 
          active: isActivePage("Conversations") 
        },
        { id: 'Assignment Rules',
          icon:  <ShuffleIcon/>, 
          url: `/apps/${app.key}/conversations/assignment_rules`, 
          active: isActivePage("Assignment Rules") 
        },
      ],
    },
    {
      id: I18n.t("navigator.campaigns"),
      icon: <FlagOutlined style={{ fontSize: 30 }}/>,
      children: [
        /*{ id: 'Analytics', icon: <SettingsIcon /> },
        { id: 'Performance', icon: <TimerIcon /> },
        { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },*/
        { id: 'campaigns', label: 'Mailing Campaigns', 
          icon: <EmailIcon/>, 
          url: `${appid}/messages/campaigns`, 
          active: isActivePage("campaigns")  },
        { id: 'user_auto_messages', 
          label: 'In App messages', 
          icon: <MessageIcon/>, 
          url: `${appid}/messages/user_auto_messages`, 
          active: isActivePage("user_auto_messages")
        },
        { id: 'tours', label: 'Guided tours',  
          icon: <FilterFramesIcon/>, 
          url: `${appid}/messages/tours`, 
          active: isActivePage("tours")},
      ],
    },

    {
      id: 'Bot',
      label: I18n.t("navigator.routing_bots"),
      icon: <DeviceHubOutlined style={{ fontSize: 30 }}/>,
      children: [
        { id: 'For Leads', 
          icon: <AssignmentIndIcon/>, 
          url: `${appid}/bots/leads`, 
          active: isActivePage("botleads")},
        { id: 'For Users', 
          icon: <PermIdentityIcon/>, 
          url: `${appid}/bots/users`, 
          active: isActivePage("botusers")},
        { id: 'Settings', 
          icon: <SettingsIcon/>, 
          url: `${appid}/bots/settings`, 
          active: isActivePage("botSettings")}
      ],
    },

    {
      label: I18n.t("navigator.help_center"),
      id: 'HelpCenter',
      icon: <BookOutlined style={{ fontSize: 30 }}/>,
      children: [
        { id: 'Articles', 
          icon: <BookIcon/>,
          url: `/apps/${app.key}/articles`, 
          active: isActivePage("Articles")},
        { id: 'Collections', 
          icon: <FolderIcon/>, 
          url: `/apps/${app.key}/articles/collections`, 
          active: isActivePage("Collections")},
        { id: 'Settings', 
          icon: <SettingsIcon/>, 
          url: `/apps/${app.key}/articles/settings`, 
          active: isActivePage("Settings")},
      ],
    },

    {
      id: 'Settings',
      label: I18n.t("navigator.settings"),
      icon: <SettingsOutlined style={{ fontSize: 30 }}/>,
      children: [
        { id: 'App Settings', icon:  <SettingsIcon/>, 
          url: `/apps/${app.key}/settings`, 
          active: isActivePage("app_settings") },
        { id: 'Team', icon: <SupervisedUserCircleIcon />, 
          url: `/apps/${app.key}/team`, 
          active: isActivePage("team") 
        },
        { id: 'Integrations', icon: <WidgetsIcon />, 
          url: `/apps/${app.key}/integrations`, 
          active: isActivePage("integrations") 
        },
        //{ id: 'Authentication', icon: <ShuffleIcon />, active: isActivePage("user_auto_messages")},
      ],
    },
    /*
    {
      id: 'Develop',
      icon: <PeopleIcon style={{ fontSize: 30 }}/>,
      children: [
        { id: 'Api', icon: <DnsRoundedIcon /> },
        { id: 'Storage', icon: <PermMediaOutlinedIcon /> },
        { id: 'Hosting', icon: <PublicIcon /> },
        { id: 'Functions', icon: <SettingsEthernetIcon /> },
        { id: 'ML Kit', icon: <SettingsInputComponentIcon /> },
      ],
    },*/
  ];

  function renderItemList(){
    //console.log("kategories", categories, navigation )
    return (
      categories.map(({ id, label, icon, children }) => {
        return <ExpansionPanel 
          key={id}
          expanded={expanded === id} 
          onChange={handleChange(id)}>

          <ExpansionPanelSummary 
            aria-controls="panel1d-content" 
            id="panel1d-header"
            className={classes.expansionPanelSummary}>
              <ListItem className={classes.categoryHeader}>
                {
                  icon &&
                    <ListItemIcon>{icon}</ListItemIcon>
                }
                <ListItemText
                  classes={{
                    primary: classes.categoryHeaderPrimary,
                  }}
                >
                  {label || id}
                </ListItemText>
              </ListItem>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails className={classes.expansionPanelDetails}>
            {children.map(({ id: childId, label, icon, active, url, onClick }) => (
                <ListItem
                  button
                  dense
                  key={childId}
                  className={clsx(
                    classes.item,
                    classes.itemActionable,
                    active && classes.itemActiveItem,
                  )}
                  onClick={(e) => {
                    e.preventDefault()
                    //this.setActiveLink(o, ()=>{
                      url ? context.router.history.push(url) : onClick()
                    //})
                  }}
                >
                  {icon && <ListItemIcon>{icon}</ListItemIcon> }
                  <ListItemText
                    classes={{
                      primary: classes.itemPrimary,
                      dense: classes.textDense,
                    }}
                  >
                    {label || childId}
                  </ListItemText>
                </ListItem>
              ))}
              <Divider className={classes.divider} />
      
          </ExpansionPanelDetails>

        </ExpansionPanel>
      })
    )
  }

  function renderListHeader(){
    return <React.Fragment>
              <ListItem className={clsx(classes.chaskiq, classes.item, classes.itemCategory)}>
                <div className={classes.logo} />
              </ListItem>
              <ListItem 
                className={clsx(classes.item, classes.itemCategory)}
                >
                <ListItemIcon>
                  <HomeIcon onClick={(e) => {
                    e.preventDefault()
                    context.router.history.push(`/apps/${app.key}`)
                  }} />
                </ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    context.router.history.push(`/apps/${app.key}`)
                  }}
                >
                  Project Overview
                </ListItemText>

                {/*<ListItemIcon>
                  
                    <ListMenu 
                      handleClick={visitApp} 
                      options={apps}
                      button={  <Tooltip 
                                  title="Switch project" 
                                  placement="bottom">
                                  <Fab 
                                    variant="round"
                                    size="small">
                                    <ExpandMore />
                                  </Fab>
                                </Tooltip>
                              }
                    />
                  
                </ListItemIcon>*/}
              </ListItem>
            </React.Fragment>
  }

  return (
    <Drawer 
      PaperProps={props.PaperProps}
      variant={props.variant}
      open={props.open}
      onClose={props.onClose}
      >
      <List disablePadding>
        
        {renderListHeader()}
        {renderItemList()}

      </List>
    </Drawer>
  );
}

Navigator.contextTypes = {
  router: PropTypes.object,
};

/*
Navigator.propTypes = {
  open: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  app: PropTypes.object,
  currentUser: PropTypes.object
};*/

//export default withStyles(styles)(Navigator);

function mapStateToProps(state, ownProps) {

  const { 
    auth, 
    app, 
    segment, 
    app_users,
    navigation,
  } = state
  const { loading, isAuthenticated } = auth

  return {
    app,
    navigation,
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Navigator)))
//export default withStyles(styles)(withRouter(connect(mapStateToProps)( Navigator )))


