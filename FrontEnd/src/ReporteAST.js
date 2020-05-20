
var arrayCollection = [
    {"id": "animal", "parent": "#", "text": "Animales"},
    {"id": "device", "parent": "#", "text": "Devices"},
    {"id": "dog", "parent": "animal", "text": "Dogs"},
    {"id": "lion", "parent": "animal", "text": "Lions"}
];

$(function() {
    $('#html').jstree({
        'core': {
            'data': arrayCollection
        }
    });
});
