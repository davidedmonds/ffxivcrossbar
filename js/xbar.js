var data;

jQuery(window).ready(function () {
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
                        revert : true
                    })
                    .appendTo(div);
            }
        }
    });
    
    jQuery('.slot')
        .droppable({
            accept : ".drag_skill",
            drop : function (event, ui) {
                var cc = ui.draggable.clone();
                
                if (jQuery(this).children().length > 0) {
                    jQuery(this).children().remove();
                }
                
                cc.css({
                    left : 0,
                    top : 0
                })
                .draggable({
                    revert : true
                })
                .click(function (event) {
                    // TODO: finish this
                    event.preventDefault();
                    event.stopPropagation();
                    console.log(event.which);
                    if (event.which === 3) {
                        jQuery(this).remove();
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
