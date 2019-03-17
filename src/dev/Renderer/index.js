import React, { Component } from 'react';
import PropTypes from "prop-types";

import App, {
  ContextProvider,
  SubscriptionProvider,
} from "../../App";

import { Renderer as PrismaCmsRenderer } from '@prisma-cms/front'

import MainMenu from './MainMenu';

import moment from "moment";

class DevRenderer extends PrismaCmsRenderer {


  static propTypes = {
    ...PrismaCmsRenderer.propTypes,
    pure: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    ...PrismaCmsRenderer.defaultProps,
    pure: false,
  }


  constructor(props) {

    super(props);

    this.state = {
      ...this.state,
      dates: [
        {
          startDate: 621257600 * 1000,
          endDate: 817980800 * 1000,
          label: "First item label",
        },
        {
          startDate: 911257600 * 1000,
          endDate: 1117980800 * 1000,
        },
      ],
    };

  }


  updateItem(item, data) {

    const {
      dates,
    } = this.state;

    const index = dates.indexOf(item);

    if (index === -1) {

      return;
    }

    const newDates = [...dates];


    newDates[index] = Object.assign({ ...item }, data);

    this.setState({
      // startDate: time,
      dates: newDates,
    });

  }

  getRoutes() {

    let routes = super.getRoutes();

    const {
      dates,
    } = this.state;

    return [
      {
        exact: true,
        path: "/",
        // component: App,
        render: props => {

          return <div
            style={{
              margin: "50px 100px",
            }}
          >

            <App
              editable={true}
              onStartDateChange={(item, time) => {

                this.updateItem(item, {
                  startDate: time,
                });
              }}
              onEndDateChange={(item, time) => {

                this.updateItem(item, {
                  endDate: time,
                });
              }}
              minDate={601257600 * 1000}
              maxDate={1217980800 * 1000}
              // startDate={startDate}
              // endDate={endDate}
              dates={dates}
              {...props}
            />

          </div>
        },
      },
      // {
      //   path: "*",
      //   render: props => this.renderOtherPages(props),
      // },
    ].concat(routes);

  }



  renderMenu() {

    return <MainMenu />
  }


  renderWrapper() {

    return <ContextProvider>
      <SubscriptionProvider>
        {super.renderWrapper()}
      </SubscriptionProvider>
    </ContextProvider>;

  }


  render() {

    const {
      pure,
      ...other
    } = this.props;

    return pure ? <App
      {...other}
    /> : super.render();

  }

}

export default DevRenderer;