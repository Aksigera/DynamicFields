var DynamicFields;
(function (DynamicFields_1) {
    var HTML_CLASS = 'w-dynamic-fields';
    var DynamicField = (function () {
        function DynamicField(field, jsonStructure) {
            this.id = HTML_CLASS;
            this.jsonStructure = jsonStructure;
            this.rowsCount = 0;
            this.$field = $(field);
            this.$field.attr('id', this.id);
            this.$addButton = this.$field.find('#' + HTML_CLASS + '-addRow');
            this.$form = $(field.closest('form'));
            this.$form.submit(function () {
                DynamicFields_1.dynamicField.save();
            });
            this.$addButton.on('click', function () {
                DynamicFields_1.dynamicField.addRow();
            });
            this.build();
        }
        DynamicField.prototype.save = function () {
            var values;
            switch (this.jsonStructure) {
                case 'name-value':
                    values = [];
                    this.$field.find('.' + HTML_CLASS + '-row').each(function (index, elem) {
                        var inputs = $(elem).children('input, textarea'), obj = {};
                        obj['name'] = inputs[0].value;
                        obj['value'] = inputs[1].value;
                        values.push(obj);
                    });
                    this.$field.children('[type="hidden"]').val(JSON.stringify(values));
                    break;
                case 'key-value':
                    values = {};
                    this.$field.find('.' + HTML_CLASS + '-row').each(function (index, elem) {
                        var inputs = $(elem).children('input, textarea');
                        values[inputs[0].value] = inputs[1].value;
                    });
                    this.$field.children('[type="hidden"]').val(JSON.stringify(values));
                    break;
                default:
                    throw new Error('jsonStructure of ' + this.constructor.name + ' is incorrect');
            }
            return this;
        };
        DynamicField.prototype.loadFromJson = function () {
            var data = this.$field.children('[type="hidden"]').val();
            if (data) {
                data = JSON.parse(data);
                switch (this.jsonStructure) {
                    case 'name-value':
                        for (var i = 0; i < data.length; i++) {
                            this.addRow(data[i]['name'], data[i]['value']);
                        }
                        break;
                    case 'key-value':
                        for (var key in data) {
                            if (data.hasOwnProperty(key)) {
                                this.addRow(key, data[key]);
                            }
                        }
                        break;
                    default:
                        throw new Error('jsonStructure of ' + this.constructor.name + ' is incorrect');
                }
            }
        };
        DynamicField.prototype.build = function () {
            this.loadFromJson();
        };
        DynamicField.prototype.deleteRow = function (number) {
            this.$field.find('.' + HTML_CLASS + '-row[title="' + number + '"]').remove();
            return this;
        };
        DynamicField.prototype.addRow = function (firstValue, secondValue) {
            if (firstValue === void 0) { firstValue = ''; }
            if (secondValue === void 0) { secondValue = ''; }
            var html = '<div class="' + HTML_CLASS + '-row" title="' + this.rowsCount + '">' +
                '<button type="button" class="' + HTML_CLASS + '-row-delete">-</button>' +
                '<input type="text" value="' + firstValue + '" placeholder="Имя..">' +
                '<textarea rows="3" cols="60" placeholder="Значение..">' + secondValue + '</textarea>' +
                '</div>';
            this.$addButton.before(html);
            this.$field.find('div[title="' + this.rowsCount + '"] .' + HTML_CLASS + '-row-delete').on('click', function () {
                var number = this.parentNode.title;
                DynamicFields_1.dynamicField.deleteRow(number);
            });
            this.rowsCount++;
            return this;
        };
        return DynamicField;
    }());
    function init(jsonStructure) {
        $('#' + HTML_CLASS).each(function (index, elem) {
            DynamicFields_1.dynamicField = new DynamicField(elem, jsonStructure);
        });
    }
    init(DynamicFields.config.jsonStructure);
})(DynamicFields || (DynamicFields = {}));
//# sourceMappingURL=dynamic-fields.js.map