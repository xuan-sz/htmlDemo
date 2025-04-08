(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($) {
    'use strict';
    var MultiSelect = window.MultiSelect || {};
    
    MultiSelect = (function() {
        function MultiSelect(element, settings) {
            var _ = this;
            _.defaults = {
                options: [],
                placeholder: 'Select items...'
            };
            _.options = $.extend({}, _.defaults, settings);
            
            _.initializeElements(element);
            _.initializeEvents();
        }
        
        return MultiSelect;
    }());

    MultiSelect.prototype.initializeElements = function(element) {
        var _ = this;
        _.$container = $(element);
        _.$container.addClass('multi-select-container');
        
        _.$input = $('<div class="multi-select-input" tabindex="0" role="listbox" aria-label="Select options"></div>');
        _.$clearIcon = $('<span class="clear-icon" role="button" aria-label="Clear all selections">×</span>');
        _.$dropdown = $('<div class="multi-select-dropdown"></div>');
        _.$hiddenInput = $('<input type="hidden" name="selectedItems">');
        
        _.options.options.forEach(function(option) {
            _.$dropdown.append('<div class="multi-select-option" data-value="' + option + '" role="option">' + option + '</div>');
        });
        
        _.$container.append(_.$input).append(_.$clearIcon).append(_.$dropdown).append(_.$hiddenInput);
        _.selectedItems = [];
        _.updateInput();
    };

    MultiSelect.prototype.initializeEvents = function() {
        var _ = this;
        
        _.$input.on('click keydown', function(e) {
            if (e.type === 'click' || e.key === 'Enter') {
                _.$dropdown.toggle();
                e.preventDefault();
            }
        });
        
        $(document).on('click', function(event) {
            if (!$(event.target).closest(_.$container).length) {
                _.$dropdown.hide();
            }
        });
        
        _.$dropdown.on('click', '.multi-select-option', function() {
            var value = $(this).data('value');
            var index = _.selectedItems.indexOf(value);
            
            if (index > -1) {
                _.selectedItems.splice(index, 1);
                $(this).removeClass('selected').attr('aria-selected', 'false');
            } else {
                _.selectedItems.push(value);
                $(this).addClass('selected').attr('aria-selected', 'true');
            }
            
            _.updateInput();
            _.updateHiddenInput();
        });
        
        _.$clearIcon.on('click', function(e) {
            e.stopPropagation();
            _.clearValues();
        });
    };

    MultiSelect.prototype.updateInput = function() {
        var _ = this;
        _.$input.empty();
        if (_.selectedItems.length === 0) {
            _.$input.text(_.options.placeholder);
        } else {
            _.selectedItems.forEach(function(item) {
                _.$input.append('<span class="selected-item">' + item + '</span>');
            });
        }
        _.$clearIcon.toggle(_.selectedItems.length > 0);
    };

    MultiSelect.prototype.updateHiddenInput = function() {
        var _ = this;
        _.$hiddenInput.val(JSON.stringify(_.selectedItems));
    };

    MultiSelect.prototype.setValues = function(values) {
        var _ = this;
        _.selectedItems = values;
        _.$dropdown.find('.multi-select-option').each(function() {
            var $option = $(this);
            if (values.includes($option.data('value'))) {
                $option.addClass('selected').attr('aria-selected', 'true');
            } else {
                $option.removeClass('selected').attr('aria-selected', 'false');
            }
        });
        _.updateInput();
        _.updateHiddenInput();
    };

    MultiSelect.prototype.getValues = function() {
        return this.selectedItems;
    };

    MultiSelect.prototype.clearValues = function() {
        var _ = this;
        _.selectedItems = [];
        _.$dropdown.find('.multi-select-option').removeClass('selected').attr('aria-selected', 'false');
        _.updateInput();
        _.updateHiddenInput();
    };

    MultiSelect.prototype.addClearIcon = function() {
        var _ = this;
        if (!_.$clearIcon) {
            _.$clearIcon = $('<span class="clear-icon" role="button" aria-label="Clear all selections">×</span>');
            _.$container.append(_.$clearIcon);
            _.$clearIcon.on('click', function(e) {
                e.stopPropagation();
                _.clearValues();
            });
            _.updateInput();
        }
    };

    $.fn.multiSelect = function(options) {
        return this.each(function() {
            if (!$.data(this, 'multiSelect')) {
                $.data(this, 'multiSelect', new MultiSelect(this, options));
            }
        });
    };

    return MultiSelect;
}));