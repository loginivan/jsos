var _ = require('underscore'),

    OS = require('os'),
    globalSettings = OS.settings;

var settings = {
  WIDGET_NAME: 'timer',
  CONFIGURATOR_REF_NAME: 'configurator',
  DEFAULT_UPDATED_INTERVAL: 100,

  DEFAULT_SIZE: {
    width: '250px',
    height: '180px'
  },
  DEFAULT_POSITION: globalSettings.DEFAULT_POSITION,

  DEFAULT_TIMER_STYLES: {
    fontSize: '18px'
  },

  DEFAULT_HR_STYLES: {
    margin: '10px 0'
  },

  DEFAULT_RECORD_CONTAINER_STYLES: {
    marginBottom: '5px'
  },

  DEFAULT_RECORD_STYLES: {
    fontSize: '16px'
  }
};

module.exports = settings;