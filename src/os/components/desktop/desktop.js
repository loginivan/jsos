var React = require('react'),
    _ = require('underscore'),
    sprintf = require('sprintf-js').sprintf,

    globalSettings = require('../../settings'),
    AppDispatcher = require('../../app_dispatcher'),
    Events = require('../../events'),
    Mixins = require('../../mixins'),
    storage = require('../../storage'),

    log = require('../../actions/log'),

    Configurator = require('./configurator'),
    ConfigureBtn = require('./configure_btn');

var Desktop = React.createClass({
  mixins: [Mixins.WidgetHelper],

  getDefaultProps: function () {
    return {
      name: 'desktop',
      configuratorRefName: 'configurator'
    };
  },

  getInitialState: function () {
    return {
      widgets: [],
      nextWidgetId: 0,

      desktopStyles: globalSettings.DESKTOP_STYLES,
      configureBtnStyles: globalSettings.DESKTOP_CONFIGURE_BTN_STYLES,
      hoverConfigureBtnStyles: globalSettings.DESKTOP_HOVER_CONFIGURE_BTN_STYLES
    };
  },

  saveDesktop: function () {
    var serializedWidgets = _.map(this.state.widgets, function (widget) {
      return {
        widgetName: widget.props.widgetName,
        widgetId: widget.props.widgetId
      };
    });

    storage.set(globalSettings.DESKTOP_STORAGE_KEY, serializedWidgets);
    log('info', 'Desktop is saved.');
  },

  loadDesktop: function (serializedWidgets) {
    var widgets = this.state.widgets,
        nextWidgetId = this.state.nextWidgetId;

    _.each(serializedWidgets, function (serializedWidget) {
      var widgetName = serializedWidget.widgetName,
          widgetId = serializedWidget.widgetId;

      widgets.push(
        this._createWidget(widgetName, widgetId)
      );
      nextWidgetId = widgetId + 1;
    }.bind(this));

    this.setState({
      widgets: widgets,
      nextWidgetId: nextWidgetId
    });
    log('info', 'Desktop is loaded.');
  },

  addWidget: function (widgetName) {
    var widgets = this.state.widgets,
        nextWidgetId = this.state.nextWidgetId;

    widgets.push(
      this._createWidget(widgetName, nextWidgetId)
    );

    this.setState({
      widgets: widgets,
      nextWidgetId: nextWidgetId + 1
    }, AppDispatcher.saveDesktop);
  },

  _createWidget: function (widgetName, nextWidgetId) {
    var WidgetClass = global.Widgets[widgetName];
    return React.createElement(
      WidgetClass,
      {
        key: nextWidgetId,
        widgetName: widgetName,
        widgetId: nextWidgetId
      }
    );
  },

  removeWidget: function (widgetId) {
    var widgets = _.filter(this.state.widgets, function (widget) {
      return widget.props.widgetId !== widgetId;
    });

    this.setState({
      widgets: widgets
    }, AppDispatcher.saveDesktop);
  },

  componentDidMount: function () {
    AppDispatcher.bind(Events.saveDesktop, function () {
      this.saveDesktop();
    }.bind(this));

    storage.get(globalSettings.DESKTOP_STORAGE_KEY, this.loadDesktop);

    AppDispatcher.bind(Events.addWidget, function (WidgetClass) {
      this.addWidget(WidgetClass);
    }.bind(this));

    AppDispatcher.bind(Events.removeWidget, function (widgetId) {
      this.removeWidget(widgetId);
    }.bind(this));
  },

  render: function () {
    return (
      <div id="desktop" style={ this.state.desktopStyles }>
        { this.state.widgets }

        <ConfigureBtn
          style={ this.state.configureBtnStyles }
          hoverStyle={ this.state.hoverConfigureBtnStyles }
          onClick={ this.openConfigurator }
        />

        <Configurator
          ref={ this.props.configuratorRefName }
          name={ this.props.name }
        />
      </div>
    );
  }
});

module.exports = Desktop;