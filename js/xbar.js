var data;

jQuery(window).ready(function () {

    (function () {
        var div, slot, i, j, display, span,
            slotkey = [
                'LDL','LDU','LDR','LDD',
                'LAL','LAU','LAR','LAD',
                'RDL','RDU','RDR','RDD',
                'RAL','RAU','RAR','RAD'];
        
        for (i = 1; i <= 8; i += 1) {
            if (i == 1) {
                display = 'block';
            } else {
                display = 'none';
            }
            div = jQuery('<div/>')
                .attr('id','bar'+i)
                .addClass('bar')
                .css({
                    display : display
                })
                .appendTo('#container');
            
            span = jQuery('<span/>')
                .html('Crossbar # ' + i)
                .css({
                    color : 'white',
                    'font-weight' : 'bold',
                    'font-size' : '2em'
                })
                .appendTo(div);
            
            for (j = 0; j < slotkey.length; j += 1) {
                slot = jQuery('<div/>')
                    .addClass('slot ' + slotkey[j])
                    .appendTo(div);
            }
        }
    }());

    jQuery('#bar').change(function (event) {
        jQuery('.bar').hide();
        jQuery('#bar'+jQuery('#bar').find('option:selected').attr('value'))
            .show();
    });

    jQuery('#class').change(function (event) {
        var clas = jQuery('#class').find('option:selected').attr('value'),
            raw_abilities = data.abilities,
            my_abilities = [],
            keys, i, k, div, img, ability, url;
        
        keys = Object.keys(raw_abilities);
        
        jQuery('#right_panel').children().remove();
        
        for (i = 0; i < keys.length; i += 1) {
            k = keys[i];
            if (raw_abilities[k]['class'] === clas) {
                ability = raw_abilities[k];
                my_abilities.push(ability);
                
                url = 'http://xivdbimg.zamimg.com/images/icons/000000/' + ability.icon + '.png';
                
                div = jQuery('<div/>')
                    .attr('class', 'skillContainer')
                    .css({
                        'background-image' : "url(" + url + ")",
                        margin : 3,
                        width : 40,
                        height : 40,
                        border : '1px solid black',
                        float : 'left'
                    })
                    .appendTo('#right_panel');

                img = jQuery('<img/>')
                    .attr('class', 'drag_skill')
                    .attr('src', url)
                    .attr('alt', ability.label)
                    .attr('title', ability.label)
                    .css({
                        'z-index' : 50
                    })
                    .draggable({
                        revert : true,
                        snap : '.slot'
                    })
                    .appendTo(div);
            }
        }
    });
    
    jQuery('.slot')
        .droppable({
            accept : ".drag_skill",
            drop : function (event, ui) {
                var draggable, still;
                if (!ui.draggable.hasClass('clone')) {
                    draggable = ui.draggable.clone()
                        .addClass('clone');
                } else {
                    draggable = ui.draggable;
                }
                
                if (jQuery(this).children().length > 0) {
                    still = jQuery(this).find('img:first');
                    
                    if (!ui.draggable.hasClass('clone')) {
                        jQuery(this).children().remove();
                    } else {
                        still.insertBefore(draggable);
                    }
                }
                
                draggable.css({
                    left : 0,
                    top : 0
                })
                .draggable({
                    revert : true,
                    snap : '.slot'
                })
                .dblclick(function (event) {
                    if (event.which === 1) {
                        jQuery(this).remove();
                        event.stopPropagation();
                    }
                })
                .appendTo(this);
            }
        });
});


data = {
    abilities : {
        gla_fast_blade : {
            label : 'Fast Blade',
            icon : '000208',
            'class' : 'gladiator'
        },
        gla_rampart : {
            label : 'Rampart',
            icon : '000202',
            'class' : 'gladiator'
        },
        gla_savage_blade : {
            label : 'Savage Blade',
            icon : '000207',
            'class' : 'gladiator'
        },
        gla_fight_or_flight : {
            label : 'Fight Or Flight',
            icon : '000216',
            'class' : 'gladiator'
        },
        gla_flash : {
            label : 'Flash',
            icon : '000209',
            'class' : 'gladiator'
        },
        gla_convalescence : {
            label : 'Convalescence',
            icon : '000212',
            'class' : 'gladiator'
        },
        gla_riot_blade : {
            label : 'Riot Blade',
            icon : '000206',
            'class' : 'gladiator'
        },
        gla_shield_lob : {
            label : 'Shield Lob',
            icon : '000214',
            'class' : 'gladiator'
        },
        gla_shield_bash : {
            label : 'Shield Bash',
            icon : '000204',
            'class' : 'gladiator'
        },
        gla_provoke : {
            label : 'Provoke',
            icon : '000215',
            'class' : 'gladiator'
        },
        gla_rage_of_halone : {
            label : 'Rage of Halone',
            icon : '000205',
            'class' : 'gladiator'
        },
        gla_shield_swipe : {
            label : 'Shield Swipe',
            icon : '000210',
            'class' : 'gladiator'
        },
        gla_awareness : {
            label : 'Awareness',
            icon : '000213',
            'class' : 'gladiator'
        },
        gla_sentinel : {
            label : 'Sentinel',
            icon : '000201',
            'class' : 'gladiator'
        },
        gla_tempered_will : {
            label : 'Tempered Will',
            icon : '000203',
            'class' : 'gladiator'
        },
        gla_bulwark : {
            label : 'Bulwark',
            icon : '000217',
            'class' : 'gladiator'
        },
        gla_circle_of_scorn : {
            label : 'Circle of Scorn',
            icon : '000211',
            'class' : 'gladiator'
        }
    }
}
