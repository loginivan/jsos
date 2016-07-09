var _ = require('underscore'),

    OS = require('os'),
    globalSettings = OS.settings;

var settings = {
  WIDGET_NAME: 'webopener',
  CONFIGURATOR_REF_NAME: 'configurator',

  DEFAULT_WIDGET_STYLES: _.extend(
    _.clone(globalSettings.DEFAULT_WIDGET_STYLES),
    {
      width: '550px',
      height: '360px'
    }
  ),

  DEFAULT_WEBPAGE_STYLES: {
    width: '120px',
    textAlign: 'center',
    float: 'left',
    padding: '10px',
    margin: '5px'
  },

  DEFAULT_ICON_STYLES: {
    width: '100px'
  }
};

module.exports = settings;
