import React, { Component } from 'react';
import PropTypes from 'prop-types';



import ProTypes from "prop-types";

import { withStyles } from 'material-ui';

import moment from "moment";

import TimelineItem from "./Item";

export {
  TimelineItem,
}

export const styles = {
  root: {
    // height: 24,
    // margin: 100,
    background: "#ccc",
  },
  maxCursorClass: {
    "&.cursor-arrow:after": {
      "content": "''",
      "position": "absolute",
      "top": "0",
      "right": "96%",
      "width": "0",
      "height": "0",
      "border": "12px solid transparent",
      "borderRight": "12px solid #2895D4"
    }
  },
  minCursorClass: {
    "&.cursor-arrow:before": {
      "content": "''",
      "position": "absolute",
      "top": "0",
      "left": "96%",
      "width": "0",
      "height": "0",
      "border": "12px solid transparent",
      "borderLeft": "12px solid #2895D4"
    },
  },
  timeline: {
    "height": 20,
    "display": "inline-flex",
    // "position": "absolute",
    "position": "relative",
    "userSelect": "none",
    "zIndex": "1",
    display: "flex",
    flexWrap: "nowrap",

    // justifyContent: "space-around",
  },
  timeBlock: {

    height: "100%",
    flex: 1,
    whiteSpace: "nowrap",
    // padding: "5px",
    // "width": "200px",
    // "float": "left",
    "padding": "6px 0 0 0",
    // border: "1px solid",
    border: "none",
    // borderColor: "red",
    "userSelect": "none",
    // "MozUserSelect": "none",
    // "WebkitUserSelect": "none",
    // "MsUserSelect": "none",
    "textAlign": "center",
    "fontSize": "smaller",
    zIndex: -1,


    // border: "1px solid",

    "& .time-block--in-range": {
      // opacity: 0.1,
    },
  },
  position: {
    // border: "1px solid blue",
    background: "#4ff754",
    position: "absolute",
    top: 0,
    bottom: 0,
    zIndex: -1,
  },
  control: {
    border: "1px solid #1fa906",
    position: "absolute",
    height: "100%",
    
    "&.editable": {
      cursor: "pointer",
    },
  },
  itemLabel: {
    "textOverflow": "ellipsis",
    "width": "100%",
    "overflow": "hidden",
    "display": "inline-block",
    "whiteSpace": "nowrap",
    "padding": "3px",
    "textAlign": "center",
    fontSize: "0.8rem",
  },
}


export class Timeline extends Component {

  static propTypes = {
    classes: ProTypes.object.isRequired,
    editable: ProTypes.bool.isRequired,

    minDate: PropTypes.number.isRequired,
    maxDate: PropTypes.number.isRequired,
    dates: PropTypes.array.isRequired,
    // startDate: PropTypes.number.isRequired,
    // endDate: PropTypes.number.isRequired,
    onStartDateChange: ProTypes.func.isRequired,
    onEndDateChange: ProTypes.func.isRequired,
  }

  static defaultProps = {
    editable: false,
  }


  constructor(props) {

    super(props);

    this.state = {
      // minCursorX: 0,
      // maxCursorX: 0,
      // minCursorDate: 0,
      // maxCursorDate: 0,
      dragStartDate: null,
      dragEndDate: null,
    };

  }




  getTimeline() {

    return this.timeline;
  }





  getCursorPositionLeft(x) {


    const timeline = this.getTimeline();

    const {
      x: clientOffsetX,
    } = timeline.getBoundingClientRect()

    this.setState({
      dragStartDate: null,
    });

    return x - clientOffsetX

  }




  _getAvailableYearsHtml() {

    let {
      classes,
      minDate,
      maxDate,

      // startDate,
      // endDate,
      dates,

      editable,
      onStartDateChange,
      onEndDateChange,
    } = this.props;

    // const {
    //   dragStartDate = null,
    //   dragEndDate = null,
    // } = this.state;



    // console.log("!minDate || !maxDate || !(maxDate > minDate)", minDate, maxDate, (maxDate > minDate), !minDate || !maxDate || !(maxDate > minDate));

    if (!minDate || !maxDate || !(maxDate > minDate)) {
      return null
    }

    minDate = moment(minDate);
    maxDate = moment(maxDate);


    const output = dates.map((n, index) => {

      // let {
      //   startDate,
      //   endDate,
      // } = n;

      // startDate = moment(startDate);
      // endDate = moment(endDate);


      // console.log("_getAvailableYearsHtml min max", minDate, maxDate, maxDate > minDate, startDate, endDate);


      // let startDateOffset = `${this.getTimelinePosition(startDate)}%`;
      // let endDateOffset = `${100 - this.getTimelinePosition(endDate)}%`;


      // /**
      //  * Учитываем позицию при перетаскивании
      //  */
      // if (dragStartDate !== null) {

      //   startDateOffset = `${dragStartDate}px`;

      // }
      // if (dragEndDate !== null) {

      //   endDateOffset = `calc(100% - ${dragEndDate}px)`;

      // }

      return <TimelineItem
        key={index}
        item={n}
        classes={classes}
        minDate={minDate}
        maxDate={maxDate}
        getTimeline={this.getTimeline.bind(this)}
        getCursorPositionLeft={this.getCursorPositionLeft.bind(this)}
        editable={editable}
        onStartDateChange={time => onStartDateChange(n, time)}
        onEndDateChange={time => onEndDateChange(n, time)}
      // style={{
      //   left: startDateOffset,
      //   right: endDateOffset,
      // }}
      >
        {/* <div
          className={classes.control}
          style={{
            left: 0,
          }}
          onMouseDown={event => this.onTimelineMouseDown(event, "dragStartDate")}
        />
        <div
          className={classes.control}
          style={{
            right: 0,
          }}
          onMouseDown={event => this.onTimelineMouseDown(event, "dragEndDate")}
        /> */}

      </TimelineItem>


      // return <div
      //   key={index}
      //   className={classes.position}
      //   style={{
      //     left: startDateOffset,
      //     right: endDateOffset,
      //   }}
      // >
      //   <div
      //     className={classes.control}
      //     style={{
      //       left: 0,
      //     }}
      //     onMouseDown={event => this.onTimelineMouseDown(event, "dragStartDate")}
      //   />
      //   <div
      //     className={classes.control}
      //     style={{
      //       right: 0,
      //     }}
      //     onMouseDown={event => this.onTimelineMouseDown(event, "dragEndDate")}
      //   />

      // </div>
    });


    return output;
  }


  render() {

    const {
      classes,
      minDate,
      maxDate,

      ...other
    } = this.props;


    let timelineWrapperClass = 'timeline-wrapper';


    if (this.props.disabled) timelineWrapperClass += ' timeline--disabled';

    return (
      <div className={[classes.root, timelineWrapperClass].join(" ")} ref={(ref) => this.timelineWrapper = ref}>

        <div
          className={[classes.timeline, "timeline-available"].join(" ")}
          ref={el => {
            this.timeline = el;
          }}
        >
          {this._getAvailableYearsHtml()}
        </div>


      </div>
    );
  }


}

export default withStyles(styles)(Timeline);