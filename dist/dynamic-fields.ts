interface Function {
    name:string;
}

namespace DynamicFields {
    declare var DynamicFields:{
        config:{
            jsonStructure:any
        }
    };

    const HTML_CLASS = 'w-dynamic-fields';
    export var dynamicField:DynamicField; //TODO: Переделать для множества виджетов на странице

    class DynamicField {

        private jsonStructure;

        $field:JQuery;

        $addButton:JQuery;

        $form:JQuery;

        id:string;

        rowsCount:number;

        constructor(field, jsonStructure) {
            this.id = HTML_CLASS;
            this.jsonStructure = jsonStructure;
            this.rowsCount = 0;

            this.$field = $(field);
            this.$field.attr('id', this.id);
            this.$addButton = this.$field.find('#' + HTML_CLASS + '-addRow');
            this.$form = $(field.closest('form'));

            this.$form.submit(function () {
                dynamicField.save();
            });
            this.$addButton.on('click', function () {
                dynamicField.addRow();
            });

            this.build();
        }

        private save():DynamicField {
            var values;

            switch (this.jsonStructure) {

                case 'name-value':
                    values = [];
                    this.$field.find('.' + HTML_CLASS + '-row').each(function (index, elem) {
                        var inputs = $(elem).children('input, textarea'),
                            obj = {};
                        obj['name'] = (<HTMLInputElement>inputs[0]).value;
                        obj['value'] = (<HTMLInputElement>inputs[1]).value;
                        values.push(obj);
                    });
                    this.$field.children('[type="hidden"]').val(JSON.stringify(values));
                    break;

                case 'key-value':
                    values = {};
                    this.$field.find('.' + HTML_CLASS + '-row').each(function (index, elem) {
                        var inputs = $(elem).children('input, textarea');
                        values[(<HTMLInputElement>inputs[0]).value] = (<HTMLInputElement>inputs[1]).value;
                    });
                    this.$field.children('[type="hidden"]').val(JSON.stringify(values));
                    break;

                default:
                    throw new Error(`jsonStructure of ${this.constructor.name} is incorrect`)
            }

            return this;
        }

        private loadFromJson():void {
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
                        throw new Error(`jsonStructure of ${this.constructor.name} is incorrect`)
                }
            }
        }

        public build():void {

            this.loadFromJson();
        }

        private deleteRow(number):DynamicField {
            this.$field.find(`.${HTML_CLASS}-row[title="${number}"]`).remove();

            return this;
        }

        private addRow(firstValue = '', secondValue = ''):DynamicField {
            var html = `
                <div class="${HTML_CLASS}-row" title="${this.rowsCount}">
                <button type="button" class="${HTML_CLASS}-row-delete">-</button>
                <input type="text" value="${firstValue}" placeholder="Имя..">
                <textarea rows="3" cols="60" placeholder="Значение..">${secondValue}</textarea>
                </div>
`;
            this.$addButton.before(html);
            this.$field.find(`div[title="${this.rowsCount}"] .${HTML_CLASS}-row-delete`).on('click', function () {
                var number = this.parentNode.title;
                dynamicField.deleteRow(number);
            });
            this.rowsCount++;

            return this;
        }
    }

    function init(jsonStructure) {
        $('#' + HTML_CLASS).each(function (index, elem) {
            dynamicField = new DynamicField(elem, jsonStructure);
        });
    }

    init(DynamicFields.config.jsonStructure);
}
