import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from "moment";

class TimelineItem extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    editable: PropTypes.bool.isRequired,
    editable: PropTypes.bool.isRequired,
    minDate: PropTypes.instanceOf(moment).isRequired,
    maxDate: PropTypes.instanceOf(moment).isRequired,
    // getTimelinePosition: PropTypes.func.isRequired,
    getTimeline: PropTypes.func.isRequired,
    getCursorPositionLeft: PropTypes.func.isRequired,
    onStartDateChange: PropTypes.func.isRequired,
    onEndDateChange: PropTypes.func.isRequired,
    label: PropTypes.string,
  };


  state = {
    dragStartDate: null,
    dragEndDate: null,
  }


  // getTimelinePosition() {

  //   const {
  //     getTimelinePosition,
  //   } = this.props;

  //   return getTimelinePosition();
  // }


  getItem() {

    return this.props.item;
  }

  getCursorPositionLeft(x) {

    const {
      getCursorPositionLeft,
    } = this.props;

    return getCursorPositionLeft(x);

  }


  getTimeline() {

    const {
      getTimeline,
    } = this.props;

    return getTimeline();
  }

  getTimelinePosition(startDate) {

    // let {
    //   minDate,
    //   maxDate,
    // } = this.getItem();

    let {
      minDate,
      maxDate,
    } = this.props;

    // minDate = moment(minDate);
    // maxDate = moment(maxDate);

    const min = minDate.toDate().getTime();
    const max = maxDate.toDate().getTime();
    const current = startDate.toDate().getTime();

    // console.log("_getAvailableYearsHtml min max current", min, max, current);

    const percent = (max - min) / 100;

    // console.log("_getAvailableYearsHtml percent", percent);

    let startOffset = (current - min) / percent

    // console.log("_getAvailableYearsHtml startOffset", startOffset);


    return startOffset;
  }


  onTimelineMouseDown(event, direction) {


    const {
      [direction]: currentPosition = null,
    } = this.state;

    if (currentPosition !== null) {
      return;
    }

    const {
      clientX,
    } = event;

    const newX = this.getCursorPositionLeft(clientX);



    // const onMouseUp = event => this.onTimelineMouseUp(event);

    const onMouseMove = event => this.onTimelineMouseMove(event, direction);

    this.setState({
      [direction]: newX,
    }, () => {


      // onMouseUp={event => this.onTimelineMouseUp(event)}
      // onMouseOut={event => this.onTimelineMouseOut(event)}
      // onMouseMove={event => this.onTimelineMouseMove(event)}

      const {
        window,
      } = global;

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", (event) => {

        this.onTimelineMouseUp(event, direction);

        this.setState({
          [direction]: null,
        });

        window.removeEventListener("mousemove", onMouseMove);
      });

    });
  }


  onTimelineMouseMove(event, direction) {

    const {
      clientX,
    } = event;

    const {
      [direction]: dragDate,
    } = this.state;

    if (!dragDate) {
      return;
    }

    const newX = this.getCursorPositionLeft(clientX);

    this.setState({
      [direction]: newX,
    });

  }

  onTimelineMouseUp(event, direction) {

    const {
      // pageX,
      // screenX,
      clientX,
    } = event;

    const {
      [direction]: dragDate = null,
    } = this.state;

    if (dragDate === null) {
      return
    }

    const newX = this.getCursorPositionLeft(clientX);


    // getBoundingClientRect

    this.onChange(newX, direction);
  }


  /**
   * Обновление выполняется как стартовой точки, так и конечной
   */
  onChange(clientX, direction) {

    let {
      // onChange,
      minDate,
      maxDate,
      onStartDateChange,
      onEndDateChange,
    } = this.props;

    let {
      startDate,
      endDate,
    } = this.getItem();

    const timeline = this.getTimeline();


    if (!timeline) {
      return;
    }

    minDate = moment(minDate);
    maxDate = moment(maxDate);
    startDate = moment(startDate);
    endDate = moment(endDate);

    const {
      offsetWidth,
    } = timeline;

    const offset = 100 - ((offsetWidth - clientX) / (offsetWidth / 100));


    // console.log("onChange offset", offset);

    // console.log("onChange minDate", minDate);
    // console.log("onChange maxDate", maxDate);

    const startTime = minDate.toDate().getTime();
    const endTime = maxDate.toDate().getTime();

    const newTime = startTime + (endTime - startTime) * (offset / 100);

    // console.log("onChange newTime", endTime, startTime, offset, (endTime - startTime), newTime);

    if (direction === "dragStartDate") {

      onStartDateChange(newTime);

      if (newTime > endDate.toDate().getTime()) {

        onEndDateChange(newTime);

      }

    }
    else {

      onEndDateChange(newTime);

      if (newTime < startDate.toDate().getTime()) {

        onStartDateChange(newTime);

      }

    }

  }

  // onTimelineMouseOut(event) {

  //   // const {
  //   //   clientX,
  //   // } = event;

  //   // this.setState({
  //   //   dragStartDate: null,
  //   // });

  //   // console.log("onTimelineMouseOut", event, { ...event }, clientX);
  // }



  render() {

    const {
      item,
      classes,
      getTimelinePosition,
      style,
      minDate,
      maxDate,
      getTimeline,
      getCursorPositionLeft,
      onStartDateChange,
      onEndDateChange,
      editable,
      ...other
    } = this.props



    const {
      dragStartDate = null,
      dragEndDate = null,
    } = this.state;



    let {
      startDate,
      endDate,
      label,
    } = item;

    if (!startDate || !endDate) {
      return null
    }

    startDate = moment(startDate);
    endDate = moment(endDate);


    let startDateOffset = `${this.getTimelinePosition(startDate)}%`;
    let endDateOffset = `${100 - this.getTimelinePosition(endDate)}%`;




    /**
     * Учитываем позицию при перетаскивании
     */
    if (dragStartDate !== null) {

      startDateOffset = `${dragStartDate}px`;

    }
    if (dragEndDate !== null) {

      endDateOffset = `calc(100% - ${dragEndDate}px)`;

    }

    return (
      <div
        // key={index}
        className={[classes.position, editable ? "editable" : ""].join(" ")}
        style={{
          left: startDateOffset,
          right: endDateOffset,
          ...style,
        }}
        {...other}
      >
        <div
          className={[classes.control, editable ? "editable" : ""].join(" ")}
          style={{
            left: 0,
          }}
          onMouseDown={editable ? event => this.onTimelineMouseDown(event, "dragStartDate") : undefined}
        />
        <div
          className={[classes.control, editable ? "editable" : ""].join(" ")}
          style={{
            right: 0,
          }}
          onMouseDown={editable ? event => this.onTimelineMouseDown(event, "dragEndDate") : undefined}
        />
        <span
          className={classes.itemLabel}
        >
          {label}
        </span>
      </div>
    );
  }
}


export default TimelineItem;