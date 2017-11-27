'use strict';

angular.module('ui.dashboard')
  .factory('WidgetModel', function ($log) {

    function defaults() {
      return {
        title: 'Widget',
        style: {},
        size: { width: '33%' },
        enableVerticalResize: true,
        containerStyle: { width: '33%' }, // default width
        isWidgetVisible : true,
        contentStyle: {}
      };
    };

    // constructor for widget model instances
    function WidgetModel(widgetDefinition, overrides) {
      // Extend this with the widget definition object with overrides merged in (deep extended).
      angular.extend(this, defaults(), _.merge(angular.copy(widgetDefinition), overrides));

      this.updateContainerStyle(this.style);

      if (!this.templateUrl && !this.template && !this.directive) {
        this.directive = widgetDefinition.name;
      }

      if (this.size && _.has(this.size, 'height')) {
        this.setHeight(this.size.height);
      }

      if (this.style && _.has(this.style, 'width')) { //TODO deprecate style attribute
        this.setWidth(this.style.width);
      }

      if (this.size && _.has(this.size, 'width')) {
        this.setWidth(this.size.width);
      }
    }

    WidgetModel.prototype = {
      // sets the width (and widthUnits)
      setWidth: function (width, units) {
        width = width.toString();
        units = units || width.replace(/^[-\.\d]+/, '') || '%';

        this.widthUnits = units;
        width = parseFloat(width);

        // check with min width if set, unit refer to width's unit
        if (this.size && _.has(this.size, 'minWidth') && _.endsWith(this.size.minWidth, units)) {
          width = _.max([parseFloat(this.size.minWidth), width]);
        }
        if (width < 0 || isNaN(width)) {
          $log.warn('malhar-angular-dashboard: setWidth was called when width was ' + width);
          return;
        }

        if (units === '%') {
          width = Math.min(100, width);
          width = Math.max(0, width);
        }

        this.containerStyle.width = width + '' + units;

        this.updateSize(this.containerStyle);

        return width + units;
      },

      setHeight: function (height) {
        this.contentStyle.height = height;
        this.updateSize(this.contentStyle);

        return height + 'px';
      },

      setStyle: function (style) {
        this.style = style;
        this.updateContainerStyle(style);
      },

      updateSize: function (size) {
        angular.extend(this.size, size);
      },

      updateContainerStyle: function (style) {
        angular.extend(this.containerStyle, style);
      },
      serialize: function() {
        return _.pick(this, ['title', 'name', 'style', 'size', 'dataModelOptions', 'attrs', 'storageHash']);
      }
    };

    return WidgetModel;
  });
