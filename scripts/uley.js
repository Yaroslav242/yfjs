// // Spore artillery shot
// const sporeShot = new ArtilleryBulletType(3.2, 15);
//
// sporeShot.trailMult = 0.8;
// sporeShot.hitEffect = Fx.massiveExplosion;
// sporeShot.knockback = 1.5;
// sporeShot.lifetime = 84;
// sporeShot.height = 15.5;
// sporeShot.width = 15;
// sporeShot.collidesTiles = false;
// sporeShot.splashDamageRadius = 40;
// sporeShot.splashDamage = 70;
// sporeShot.backColor = Pal.missileYellowBack;
// sporeShot.frontColor = Pal.missileYellow;
// sporeShot.trailEffect = Fx.artilleryTrail;
// sporeShot.trailSize = 6;
// sporeShot.hitShake = 4;
// sporeShot.shootEffect = Fx.shootBig2;
// sporeShot.status = StatusEffects.blasted;
// sporeShot.statusDuration = 60;
//
// // Spore artillery cannon
// const sporeCannon = new Weapon("yfjs-spore-artillery");
//
// sporeCannon.reload = 65;
// sporeCannon.mirror = false;
// sporeCannon.x = 0;
// sporeCannon.y = 2.5;
// sporeCannon.rotateSpeed = 1.7;
// sporeCannon.rotate = true;
// sporeCannon.shootY = 7;
// sporeCannon.shake = 2;
// sporeCannon.recoil = 2;
// sporeCannon.shadow = 12;
// sporeCannon.inaccuracy = 3;
// sporeCannon.ejectEffect = Fx.casing3;
// sporeCannon.shootSound = Sounds.artillery;
//
// sporeCannon.bullet = sporeShot;


// Create uley unit type with overridden stats
const uley = extendContent(UnitType,"uley", {
  itemCapacity : 0
  // Rest is defined in content/units/uley.hjson
});
// uley.weapons.add(sporeCannon)

// Make the constructor default dagger's
uley.constructor = () => PayloadUnit.create();

// uley.defaultController = (u) => new RepairAI();

// Set ID as 70 so reloads do not lose the unit
EntityMapping.idMap[71] = uley.constructor;

// Add recipe to ground factory
const matRequirement = ItemStack.with(Items.silicon, 45, Items.sporePod, 20);
const uleyPlan = new UnitFactory.UnitPlan( uley , 60 * 30, matRequirement );
Blocks.airFactory.plans.add(uleyPlan);
