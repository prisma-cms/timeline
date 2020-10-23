import React, { Fragment } from 'react';
import PrismaCmsPerformanceTester from "@prisma-cms/performance";

import App from '../App';


export default class DevApp extends App {


  render() {

    return <Fragment>
      <div
        id="prisma-cms-performance-tester"
      >
        <PrismaCmsPerformanceTester
          // test={{}}
          props={this.props}
          state={this.state}
          context={this.context}
          prefix="dev_app"
        />
      </div>

      {super.render()}
    </Fragment>
  }

}