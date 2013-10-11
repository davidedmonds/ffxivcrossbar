var data;

jQuery(window).ready(function () {
    slotkey = [
                'LDL','LDU','LDR','LDD',
                'LAL','LAU','LAR','LAD',
                'RDL','RDU','RDR','RDD',
                'RAL','RAU','RAR','RAD'];

    (function () {
        var div, slot, i, j, display, span;
        
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

    jQuery('#save').click(function (event) {
        var svstr = '', i, j, slotitem, tmpstr, barID, dd, label, abilityObj;
        
        for (i = 1; i <= 8; i += 1) {
            tmpstr = '';
            barID = '#bar' + i;
            for (j = 0; j < slotkey.length; j += 1) {
                dd = jQuery(barID).children().filter('.'+slotkey[j]).find('img');
                if (dd.length > 0) {
                    label = dd.attr('alt');
                    abilityObj = data.findAbilityByLabel(label);
                
                    tmpstr = slotkey[j] + ':' + abilityObj['class'] + '-' + abilityObj + '|';
                }
            }
            
            tmpstr = tmpstr.substring(0,tmpstr.length-1);
            
            svstr += tmpstr + ';';
        }
        svstr = svstr.substring(0,svstr.length-1);
        
        console.log(svstr);
        alert(svstr);
    });

    jQuery('#bar').change(function (event) {
        jQuery('.bar').hide();
        jQuery('#bar'+jQuery('#bar').find('option:selected').attr('value'))
            .show();
    });

    jQuery('#class').change(function (event) {
        var clas = jQuery('#class').find('option:selected').attr('value'),
            raw_abilities = data.category[clas].abilities,
            my_abilities = [],
            keys, i, k, div, img, ability, url, dir;
        
        keys = Object.keys(raw_abilities);
        jQuery('#right_panel').children().remove();
        
        for (i = 0; i < keys.length; i += 1) {
            k = keys[i];
            ability = raw_abilities[k];
            my_abilities.push(ability);
            
            if (Number(ability.icon) >= 3000) {
                dir = "003000";
            }
            else {
                dir = "000000";
            }
            
            url = 'http://xivdbimg.zamimg.com/images/icons/' + dir + '/' + ability.icon + '.png';
            
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
    findAbilityByCategoryLabel : function (cat, label) {
        var keys = Object.keys(this.category[cat].abilities),
            i, k;
        
        for (i = 0; i < keys.length; i += 1) {
            k = keys[i];
            
            if (this.category[cat].abilities[k].label === label) {
                return this.category[cat].abilities[k];
            }
        }
        return undefined;
    },
    
    findAbilityByLabel : function (label) {
        var cats = Object.keys(this.category),
            abilities, i, j, k;
            
        for (i = 0; i < cats.length; i += 1) {
            k = cats[i];
            abilities = cats[i].abilities;
            
            for (j = 0; j < abilities.length; j += 1) {
                if (abilities[j].label === label) {
                    return abilities[j];
                }
            }
        }
    },
    
    category : {
        gladiator : {
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
        },
        
        pugilist : {
            abilities : {
                pgl_bootshine : {
                    label : 'Bootshine',
                    icon : '000308',
                    'class' : 'pugilist'
                },
                pgl_true_strike : {
                    label : 'True Strike',
                    icon : '000309',
                    'class' : 'pugilist'
                },
                pgl_snap_punch : {
                    label : 'Snap Punch',
                    icon : '000310',
                    'class' : 'pugilist'
                },
                pgl_second_wind : {
                    label : 'Second Wind',
                    icon : '000301',
                    'class' : 'pugilist'
                },
                pgl_haymaker : {
                    label : 'Haymaker',
                    icon : '000303',
                    'class' : 'pugilist'
                },
                pgl_twin_snakes : {
                    label : 'Twin Snakes',
                    icon : '000313',
                    'class' : 'pugilist'
                },
                pgl_internal_release : {
                    label : 'Internal Release',
                    icon : '000312',
                    'class' : 'pugilist'
                },
                pgl_touch_of_death : {
                    label : 'Touch of Death',
                    icon : '000311',
                    'class' : 'pugilist'
                },
                pgl_fists_of_earth : {
                    label : 'Fists of Earth',
                    icon : '000306',
                    'class' : 'pugilist'
                },
                pgl_arm_of_the_destroyer : {
                    label : 'Arm of the Destroyer',
                    icon : '000315',
                    'class' : 'pugilist'
                },
                pgl_demolish : {
                    label : 'Demolish',
                    icon : '000304',
                    'class' : 'pugilist'
                },
                pgl_fists_of_wind : {
                    label : 'Fists of Wind',
                    icon : '003102',
                    'class' : 'pugilist'
                },
                pgl_steel_peak : {
                    label : 'Steel Peak',
                    icon : '003105',
                    'class' : 'pugilist'
                },
                pgl_mantra : {
                    label : 'Mantra',
                    icon : '000316',
                    'class' : 'pugilist'
                },
                pgl_howling_fist : {
                    label : 'Howling Fist',
                    icon : '000307',
                    'class' : 'pugilist'
                },
                pgl_perfect_balance : {
                    label : 'Perfect Balance',
                    icon : '000317',
                    'class' : 'pugilist'
                }
            }
        },
        
        marauder : {
            abilities : {
                mrd_heavy_swing : {
                    label : 'Heavy Swing',
                    icon : '000410',
                    'class' : 'marauder'
                },
                mrd_foresight : {
                    label : 'Foresight',
                    icon : '000402',
                    'class' : 'marauder'
                },
                mrd_skull_sunder : {
                    label : 'Skull Sunder',
                    icon : '000407',
                    'class' : 'marauder'
                },
                mrd_fracture : {
                    label : 'Fracture',
                    icon : '000406',
                    'class' : 'marauder'
                },
                mrd_bloodbath : {
                    label : 'Bloodbath',
                    icon : '000401',
                    'class' : 'marauder'
                },
                mrd_brutal_swing : {
                    label : 'Brutal Swing',
                    icon : '000403',
                    'class' : 'marauder'
                },
                mrd_overpower : {
                    label : 'Overpower',
                    icon : '000404',
                    'class' : 'marauder'
                },
                mrd_tomahawk : {
                    label : 'Tomahawk',
                    icon : '000411',
                    'class' : 'marauder'
                },
                mrd_maim : {
                    label : 'Maim',
                    icon : '000405',
                    'class' : 'marauder'
                },
                mrd_berserk : {
                    label : 'Berserk',
                    icon : '000409',
                    'class' : 'marauder'
                },
                mrd_mercy_stroke : {
                    label : 'Mercy Stroke',
                    icon : '000415',
                    'class' : 'marauder'
                },
                mrd_butchers_block : {
                    label : "Butcher's Block",
                    icon : '000412',
                    'class' : 'marauder'
                },
                mrd_thrill_of_battle : {
                    label : 'Thrill of Battle',
                    icon : '000413',
                    'class' : 'marauder'
                },
                mrd_storms_path : {
                    label : "Storm's Path",
                    icon : '000408',
                    'class' : 'marauder'
                },
                mrd_holmgang : {
                    label : 'Holmgang',
                    icon : '000416',
                    'class' : 'marauder'
                },
                mrd_vengeance : {
                    label : 'Vengeance',
                    icon : '000417',
                    'class' : 'marauder'
                },
                mrd_storms_eye : {
                    label : "Storm's Eye",
                    icon : '000414',
                    'class' : 'marauder'
                }
            }
        },
        
        lancer : {
            abilities : {
                lnc_true_thrust : {
                    label : 'True Thrust',
                    icon : '000510',
                    'class' : 'lancer'
                },
                lnc_feint : {
                    label : 'Feint',
                    icon : '000507',
                    'class' : 'lancer'
                },
                lnc_vorpal_thurst : {
                    label : 'Vorpal Thrust',
                    icon : '000512',
                    'class' : 'lancer'
                },
                lnc_keen_flurry : {
                    label : 'Keen Flurry',
                    icon : '000501',
                    'class' : 'lancer'
                },
                lnc_impulse_drive : {
                    label : 'Impulse Drive',
                    icon : '000513',
                    'class' : 'lancer'
                },
                lnc_leg_sweep : {
                    label : 'Leg Sweep',
                    icon : '000505',
                    'class' : 'lancer'
                },
                lnc_heavy_thrust : {
                    label : 'Heavy Thrust',
                    icon : '000511',
                    'class' : 'lancer'
                },
                lnc_piercing_talon : {
                    label : 'Piercing Talon',
                    icon : '000515',
                    'class' : 'lancer'
                },
                lnc_life_surge : {
                    label : 'Life Surge',
                    icon : '000504',
                    'class' : 'lancer'
                },
                lnc_invigorate : {
                    label : 'Invigorate',
                    icon : '000502',
                    'class' : 'lancer'
                },
                lnc_full_thrust : {
                    label : 'Full Thrust',
                    icon : '000514',
                    'class' : 'lancer'
                },
                lnc_phlebotomize : {
                    label : 'Phlebotomize',
                    icon : '000516',
                    'class' : 'lancer'
                },
                lnc_blood_for_blood : {
                    label : 'Blood For Blood',
                    icon : '000509',
                    'class' : 'lancer'
                },
                lnc_disembowel : {
                    label : 'Disembowel',
                    icon : '000517',
                    'class' : 'lancer'
                },
                lnc_doom_spike : {
                    label : 'Doom Spike',
                    icon : '000506',
                    'class' : 'lancer'
                },
                lnc_ring_of_thorns : {
                    label : 'Ring of Thorns',
                    icon : '003304',
                    'class' : 'lancer'
                },
                lnc_chaos_thrust : {
                    label : 'Chaos Thrust',
                    icon : '000508',
                    'class' : 'lancer'
                }
            }
        },
        
        archer : {
            abilities : {
                arc_heavy_shot : {
                    label : 'Heavy Shot',
                    icon : '000608',
                    'class' : 'archer'
                },
                arc_straight_shot : {
                    label : 'Straight Shot',
                    icon : '000609',
                    'class' : 'archer'
                },
                arc_raging_strikes : {
                    label : 'Raging Strikes',
                    icon : '000602',
                    'class' : 'archer'
                },
                arc_venomous_bite : {
                    label : 'Venomous Bite',
                    icon : '000613',
                    'class' : 'archer'
                },
                arc_miserys_end : {
                    label : "Misery's End",
                    icon : '000614',
                    'class' : 'archer'
                },
                arc_shadowbind : {
                    label : 'Shadowbind',
                    icon : '000606',
                    'class' : 'archer'
                },
                arc_bloodletter : {
                    label : 'Bloodletter',
                    icon : '000611',
                    'class' : 'archer'
                },
                arc_repelling_shot : {
                    label : 'Repelling Shot',
                    icon : '000616',
                    'class' : 'archer'
                },
                arc_quick_nock : {
                    label : 'Quick Nock',
                    icon : '000610',
                    'class' : 'archer'
                },
                arc_swiftsong : {
                    label : 'Swiftsong',
                    icon : '000612',
                    'class' : 'archer'
                },
                arc_hawks_eye : {
                    label : "Hawk's Eye",
                    icon : '000604',
                    'class' : 'archer'
                },
                arc_windbite : {
                    label : 'Windbite',
                    icon : '000617',
                    'class' : 'archer'
                },
                arc_quelling_strikes : {
                    label : 'Quelling Strikes',
                    icon : '000601',
                    'class' : 'archer'
                },
                arc_barrage : {
                    label : 'Barrage',
                    icon : '000603',
                    'class' : 'archer'
                },
                arc_blunt_arrow : {
                    label : 'Blunt Arrow',
                    icon : '000619',
                    'class' : 'archer'
                },
                arc_flaming_arrow : {
                    label : 'Flaming Arrow',
                    icon : '000618',
                    'class' : 'archer'
                },
                arc_wide_volley : {
                    label : 'Wide Volley',
                    icon : '000607',
                    'class' : 'archer'
                }
            }
        },
        
        conjurer : {
            abilities : {
                cnj_stone : {
                    label : 'Stone',
                    icon : '000703',
                    'class' : 'conjurer'
                },
                cnj_cure : {
                    label : 'Cure',
                    icon : '000705',
                    'class' : 'conjurer'
                },
                cnj_aero : {
                    label : 'Aero',
                    icon : '000701',
                    'class' : 'conjurer'
                },
                cnj_cleric_stance : {
                    label : 'Cleric Stance',
                    icon : '000713',
                    'class' : 'conjurer'
                },
                cnj_protect : {
                    label : 'Protect',
                    icon : '000710',
                    'class' : 'conjurer'
                },
                cnj_medica : {
                    label : 'Medica',
                    icon : '000708',
                    'class' : 'conjurer'
                },
                cnj_raise : {
                    label : 'Raise',
                    icon : '000711',
                    'class' : 'conjurer'
                },
                cnj_fluid_aura : {
                    label : 'Fluid Aura',
                    icon : '000716',
                    'class' : 'conjurer'
                },
                cnj_esuna : {
                    label : 'Esuna',
                    icon : '000717',
                    'class' : 'conjurer'
                },
                cnj_stone_ii : {
                    label : 'Stone II',
                    icon : '000704',
                    'class' : 'conjurer'
                },
                cnj_repose : {
                    label : 'Repose',
                    icon : '000714',
                    'class' : 'conjurer'
                },
                cnj_cure_ii : {
                    label : 'Cure II',
                    icon : '000706',
                    'class' : 'conjurer'
                },
                cnj_stoneskin : {
                    label : 'Stoneskin',
                    icon : '000712',
                    'class' : 'conjurer'
                },
                cnj_shroud_of_saints : {
                    label : 'Shroud of Saints',
                    icon : '000715',
                    'class' : 'conjurer'
                },
                cnj_cure_iii : {
                    label : 'Cure III',
                    icon : '000707',
                    'class' : 'conjurer'
                },
                cnj_aero_ii : {
                    label : 'Aero II',
                    icon : '000702',
                    'class' : 'conjurer'
                },
                cnj_medica_ii : {
                    label : 'Medica II',
                    icon : '000709',
                    'class' : 'conjurer'
                }
            }
        },
        
        thaumaturge : {
            abilities : {
                thm_blizzard : {
                    label : 'Blizzard',
                    icon : '000804',
                    'class' : 'thaumaturge'
                },
                thm_fire : {
                    label : 'Fire',
                    icon : '000801',
                    'class' : 'thaumaturge'
                },
                thm_transpose : {
                    label : 'Transpose',
                    icon : '000816',
                    'class' : 'thaumaturge'
                },
                thm_thunder : {
                    label : 'Thunder',
                    icon : '000807',
                    'class' : 'thaumaturge'
                },
                thm_surecast : {
                    label : 'Surecast',
                    icon : '000810',
                    'class' : 'thaumaturge'
                },
                thm_sleep : {
                    label : 'Sleep',
                    icon : '000815',
                    'class' : 'thaumaturge'
                },
                thm_blizzard_ii : {
                    label : 'Blizzard II',
                    icon : '000805',
                    'class' : 'thaumaturge'
                },
                thm_scathe : {
                    label : 'Scathe',
                    icon : '000812',
                    'class' : 'thaumaturge'
                },
                thm_fire_ii : {
                    label : 'Fire II',
                    icon : '000802',
                    'class' : 'thaumaturge'
                },
                thm_thunder_ii : {
                    label : 'Thunder II',
                    icon : '000808',
                    'class' : 'thaumaturge'
                },
                thm_swiftcast : {
                    label : 'Swiftcast',
                    icon : '000811',
                    'class' : 'thaumaturge'
                },
                thm_manaward : {
                    label : 'Manaward',
                    icon : '000813',
                    'class' : 'thaumaturge'
                },
                thm_fire_iii : {
                    label : 'Fire III',
                    icon : '000803',
                    'class' : 'thaumaturge'
                },
                thm_blizzard_iii : {
                    label : 'Blizzard III',
                    icon : '000806',
                    'class' : 'thaumaturge'
                },
                thm_lethargy : {
                    label : 'Lethargy',
                    icon : '000814',
                    'class' : 'thaumaturge'
                },
                thm_thunder_iii : {
                    label : 'Thunder III',
                    icon : '000809',
                    'class' : 'thaumaturge'
                },
                thm_aetherial_manipulation : {
                    label : 'Aetherial Manipulation',
                    icon : '000817',
                    'class' : 'thaumaturge'
                }
            }
        },
        
        arcanist : {
            abilities : {
                acn_ruin : {
                    label : 'Ruin',
                    icon : '000901',
                    'class' : 'arcanist'
                },
                acn_bio : {
                    label : 'Bio',
                    icon : '000903',
                    'class' : 'arcanist'
                },
                acn_physick : {
                    label : 'Physick',
                    icon : '000918',
                    'class' : 'arcanist'
                },
                acn_summon : {
                    label : 'Summon',
                    icon : '000916',
                    'class' : 'arcanist'
                },
                acn_aetherflow : {
                    label : 'Aetherflow',
                    icon : '000910',
                    'class' : 'arcanist'
                },
                acn_energy_drain : {
                    label : 'Energy Drain',
                    icon : '000914',
                    'class' : 'arcanist'
                },
                acn_miasma : {
                    label : 'Miasma',
                    icon : '000905',
                    'class' : 'arcanist'
                },
                acn_virus : {
                    label : 'Virus',
                    icon : '000913',
                    'class' : 'arcanist'
                },
                acn_summon_ii : {
                    label : 'Summon II',
                    icon : '000917',
                    'class' : 'arcanist'
                },
                acn_sustain : {
                    label : 'Sustain',
                    icon : '000908',
                    'class' : 'arcanist'
                },
                acn_resurrection : {
                    label : 'Resurrection',
                    icon : '000911',
                    'class' : 'arcanist'
                },
                acn_bio_ii : {
                    label : 'Bio II',
                    icon : '000904',
                    'class' : 'arcanist'
                },
                acn_bane : {
                    label : 'Bane',
                    icon : '000907',
                    'class' : 'arcanist'
                },
                acn_eye_for_an_eye : {
                    label : 'Eye for an Eye',
                    icon : '000912',
                    'class' : 'arcanist'
                },
                acn_ruin_ii : {
                    label : 'Ruin II',
                    icon : '000902',
                    'class' : 'arcanist'
                },
                acn_rouse : {
                    label : 'Rouse',
                    icon : '000909',
                    'class' : 'arcanist'
                },
                acn_miasma_ii : {
                    label : 'Miasma II',
                    icon : '000906',
                    'class' : 'arcanist'
                },
                acn_shadow_flare : {
                    label : 'Shadow Flare',
                    icon : '000915',
                    'class' : 'arcanist'
                }
            }
        }
    }
}
