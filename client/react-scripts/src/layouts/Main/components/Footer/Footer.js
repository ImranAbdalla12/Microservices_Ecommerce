import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useStyles } from './Style';
import {
  Typography,
  IconButton,
  Grid,
  List,
  ListItem,
} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import PinterestIcon from '@material-ui/icons/Pinterest';

import { Image } from 'components/atoms';



const Footer = props => {
  const { pages, className, ...rest } = props;

  const classes = useStyles();

  const products = pages.products;
  const aboutUs = pages.aboutUs;
  const account = pages.account;

  const MenuGroup = props => {
    const { item } = props;
    return (
      <List disablePadding className={classes.menuItem}>
        <ListItem disableGutters className={classes.menuGroupItem}>
          <Typography variant="body2" className={classes.menuGroupTitle}>
            {item.groupTitle}
          </Typography>
        </ListItem>
        {item.pages.map((page, i) => (
          <ListItem disableGutters key={i} className={classes.menuGroupItem}>
            <Typography
              variant="body2"
              component={'a'}
              href={page.href}
              className={clsx(classes.navLink, 'submenu-item')}
            >
              {page.title}
            </Typography>
          </ListItem>
        ))}
      </List>
    );
  };

  const ButtonLogOut = props => {
    const { item } = props;
    return (
      <List disablePadding>
        <ListItem disableGutters>
          <Typography
            variant="body2"
            color="primary"
            className={classes.menuGroupTitle}
          >
            {item.groupTitle}
          </Typography>
        </ListItem>
        <Typography
          variant="body1"
          className={clsx(classes.navLink, 'submenu-item')}
          color="textSecondary"
       
        >
          {item.pages[0].title}
        </Typography>
      </List>
    );
  };

  const ProductsPages = () => {
    const { productsRoutes } = products.children;
    return (
      <div className={classes.menu}>
        <div>
          <MenuGroup item={productsRoutes} />
        </div>
      </div>
    );
  };

  const AboutUsPages = () => {
    const { aboutUsRoutes } = aboutUs.children;
    return (
      <div className={classes.menu}>
        <div>
          <MenuGroup item={aboutUsRoutes} />
        </div>
      </div>
    );
  };

  const AccountPages = () => {
    const { settings, signup, signin, logout } = account.children;
    return (
      <div className={classes.menu}>
        <div className={classes.menuItem}>
          <MenuGroup item={settings} />
        </div>
        <div className={classes.menuItem}>
          
            <div>
              <MenuGroup item={signup} />
              <MenuGroup item={signin} />
            </div>
          
          {/* {user && <ButtonLogOut item={logout} />} */}
        </div>
      </div>
    );
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.footerContainer}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={2}>
            <List disablePadding>
              <ListItem disableGutters className={classes.logoContainerItem}>
                <div className={classes.logoContainer}>
                  <a href="/" title="thefront">
                    <Image
                      className={classes.logoImage}
                      src="https://assets.maccarianagency.com/the-front/logos/logo-negative.svg"
                      alt="thefront"
                      lazy={false}
                    />
                  </a>
                </div>
              </ListItem>
              <ListItem disableGutters>
                <IconButton className={classes.socialIcon}>
                  <FacebookIcon className={classes.icon} />
                </IconButton>
                <IconButton className={classes.socialIcon}>
                  <InstagramIcon className={classes.icon} />
                </IconButton>
                <IconButton className={classes.socialIcon}>
                  <TwitterIcon className={classes.icon} />
                </IconButton>
                <IconButton className={classes.socialIcon}>
                  <PinterestIcon className={classes.icon} />
                </IconButton>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={10} className={classes.menuListContainer}>
            <Grid container spacing={0}>
              <Grid item>
                <ProductsPages />
              </Grid>
              <Grid item>
                <AboutUsPages />
              </Grid>
              <Grid item>
                <AccountPages />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.object.isRequired,
};

export default Footer;
