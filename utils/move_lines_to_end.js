
var fs = require('fs');
var g_data = require('./publish_param_line_data.js');

for (_i in g_data.data) {
    move_lines_to_end(_i, g_data.data[_i]);
}

function move_lines_to_end(file_name, lines_to_move_arr) {
    if (lines_to_move_arr.length === 0) return;
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(file_name)
    });
    let widgetName = file_name.split('/').pop().replace('.ts', '');
    let i = 0;
    let line_arr = [];
    let pubp_line_arr = [];
    lineReader.on('line', function (line) {
        i++;
        var is_not_a_pubp_line = lines_to_move_arr.indexOf(i) === -1;
        if (is_not_a_pubp_line) {
            line_arr.push(line);
        } else {
            pubp_line_arr.push(line);
        }
    });
    lineReader.on('close', function () {
        let interface_arr = [
            'export interface ' + widgetName + ' {'
        ];
        pubp_line_arr.forEach(function (n) {
            var _n = split_pp(n);
            _n.type = _n.type === 'widget' ? "Widget" : _n.type;
            _n.type = _n.type === 'html-color' ? "string" : _n.type;
            _n.type = _n.type === 'set' ? "string" : _n.type;
            _n.type = _n.type === 'array' ? "Array" : _n.type;
            _n.type = _n.type === 'widgetArray' ? "Array" : _n.type;
            interface_arr.push(`    ${_n.name}(): ${_n.type};`);
            interface_arr.push(`    ${_n.name}(_: ${_n.type}): this;`);
        })
        interface_arr.push(`}`);
        interface_arr = interface_arr.length === 2 ? [] : interface_arr;
        var found_content = false;
        var _line_arr = [];
        line_arr.reverse().forEach(n => {
            if (n !== '\n' && n !== '' && n !== ' ') found_content = true;
            if (found_content) {
                _line_arr.push(n);
            }
        })
        _line_arr = _line_arr.reverse();
        _line_arr.push('\n');
        var content_arr = _line_arr.concat(interface_arr);
        content_arr = content_arr.concat(pubp_line_arr);
        fs.writeFile(file_name,
            content_arr.join('\n') + '\n',
            function () { }
        );
    });

    function split_pp(n) {
        var _pp = n.split(',');
        console.log(n);
        try {
            var _name = _pp[0].split('(')[1].split('"').join('').split("'").join('');
            var _type = _pp[2].split('"').join('').split("'").join('');
            _type = _type[0] === ' ' ? _type.split('').slice(1).join('') : _type;
        } catch (e) {
            _name = _name ? _name : `// name parsing is broken for this line: ${n}`;
            _type = _type ? _type : `// type parsing is broken for this line: ${n}`;
        }
        return {
            name: _name,
            type: _type
        }
    }
}

