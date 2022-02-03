import React, {Component, createElement} from "react";
import {Admin, Resource, Layout, MenuItemLink, getResources} from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {
    List,
    ListItem,
    Collapse,
    ListItemText,
    ListItemIcon,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";

import {withStyles} from "@material-ui/core/styles";

const menuStyles = () => ({
    nested: {
        fontSize: "18px",
    },
});

class Menu extends Component {
    menuList = [
        {name: "A", label: "Мероприятия", icon: <MenuIcon />},
        {name: "B", label: "Посты", icon: <MenuIcon />},
    ];
    constructor(props) {
        super(props);
        this.state = {open: "A"};
    }
    render() {
        const {resources, onMenuClick, logout} = this.props;
        return (
            <div>
                <List component="nav">
                    {this.menuList.map((menu) => {
                        return (
                            <div key={menu.name}>
                                <ListItem
                                    button
                                    onClick={() =>
                                        this.setState((state) => ({
                                            open: menu.name,
                                        }))
                                    }
                                >
                                    {menu.icon}
                                    <ListItemText inset primary={menu.label} />
                                </ListItem>
                                <Collapse
                                    in={this.state.open == menu.name}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <List component="div" disablePadding>
                                        {resources
                                            .filter(
                                                (x) =>
                                                    x.options.menu == menu.name
                                            )
                                            .map((resource, i) => (
                                                <MenuItemLink
                                                    key={"m" + i}
                                                    to={`/${resource.name}`}
                                                    primaryText={
                                                        resource.options
                                                            .label ||
                                                        resource.name
                                                    }
                                                    leftIcon={
                                                        resource.icon
                                                            ? createElement(
                                                                  resource.icon
                                                              )
                                                            : undefined
                                                    }
                                                    onClick={onMenuClick}
                                                    className={
                                                        this.props.classes
                                                            .nested
                                                    }
                                                />
                                            ))}
                                    </List>
                                </Collapse>
                            </div>
                        );
                    })}
                </List>
            </div>
        );
    }
}

var MenuWithStyles = withStyles(menuStyles)(Menu);

const MyMenu = withRouter(
    connect((state) => ({
        resources: getResources(state),
    }))(MenuWithStyles)
);

const MyLayout = (props) => <Layout {...props} menu={MyMenu} />;

export default MyLayout;
