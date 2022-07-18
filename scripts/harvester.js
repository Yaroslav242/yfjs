const miningLaser = extend(PointLaserBulletType, {
  load() {
    this.super$load();

    this.laser = Core.atlas.find("minelaser");
    this.laserEnd = Core.atlas.find("minelaser-end");
  },
  draw(b) {

       var xd = b.aimX - b.x;
       var yd = b.aimY - b.y;
       var distance = Mathf.len(xd,yd);
       var range = 100;

       var hitX = b.aimX;
       var hitY = b.aimY;

       if (distance > range) {
         // Draw laser with limited distance
         var hitX = b.x + xd * (range/distance);
         var hitY = b.y + yd * (range/distance);
       }

       var bNew = b;
       bNew.aimX = hitX;
       bNew.aimY = hitY;
       this.super$draw(bNew);
   },
   update(b) {

      var xd = b.aimX - b.x;
      var yd = b.aimY - b.y;
      var distance = Mathf.len(xd,yd);
      var range = 100;

      var hitX = b.aimX;
      var hitY = b.aimY;

      if (distance > range) {
        // Shoot laser bullet with limited distance
        var hitX = b.x + xd * (range/distance);
        var hitY = b.y + yd * (range/distance);
      }

      var bNew = b;
      bNew.aimX = hitX;
      bNew.aimY = hitY;
      this.super$update(bNew);
  },
  beamEffectSize: 0,
});

miningLaser.damage = 10;
miningLaser.hitColor = Color.valueOf("fda981");

const miningWeapon = new Weapon("mining-weapon")

miningWeapon.mirror = false;
miningWeapon.top = false;

miningWeapon.shootY = 3;
miningWeapon.x = 0;
miningWeapon.y = 0;

miningWeapon.parentizeEffects = true;
miningWeapon.reload = 0.01;
miningWeapon.shake = 0;
miningWeapon.recoil = 0;
miningWeapon.chargeSound = Sounds.lasercharge2;
miningWeapon.shootSound = Sounds.sap;
miningWeapon.continuous = true;
//miningWeapon.alwaysContinuous = true;
miningWeapon.controllable = true;
// miningWeapon.cooldownTime = 0;

miningWeapon.shootStatus = StatusEffects.slow;
miningWeapon.shootStatusDuration = 10;
miningWeapon.bullet = miningLaser;


// Create harvester unit type with overridden stats
const harvester = new UnitType("harvester");
harvester.mineTier = 3;
harvester.mineSpeed = 3.5;
harvester.itemCapacity = 100;

harvester.weapons.add(miningWeapon);

// Make the constructor default dagger's
harvester.constructor = () => LegsUnit.create();
// Set MinerAI as defualt AI

harvester.controller = (u) => {
  const ai = extend(MinerAI, {
    updateMovement() {
      if (this.invalid(this.target)) {
        // True - ore targeted, stop shooting lasers
        this.unit.controlWeapons(false);
        this.super$updateMovement();
      } else {
        // False - enemy targeted, shoot laser at them
        this.mining = false;
        this.unit.controlWeapons(true);
      }
      this.faceTarget(); //  Look at whatever it is targeting
    }
  })
  return ai;
};

// Set ID as 70 so reloads do not lose the unit
EntityMapping.idMap[70] = harvester.constructor;

// Add recipe to ground factory
const matRequirement = ItemStack.with(Items.silicon, 45, Items.surgeAlloy, 10);
const harvPlan = new UnitFactory.UnitPlan( harvester , 60 * 30, matRequirement );
Blocks.groundFactory.plans.add(harvPlan);
