const healBullet = new ContinuousLaserBulletType(2);

healBullet.length = 35;

healBullet.width = 2;
healBullet.drawSize = 70;
healBullet.lifetime = 20;
healBullet.smokeEffect = Fx.none;


healBullet.incendAmount = 0;
healBullet.incendSpread = 0;
healBullet.incendChance = 0;

healBullet.healPercent = 1;
healBullet.collidesTeam = true;
healBullet.lightColor = Color.lime;
healBullet.colors = [Color.valueOf("73e60055"),
 Color.valueOf("73e600aa"),
 Color.valueOf("ccff66"),
 Color.white];

const healBeam = new Weapon("Repair diode");
healBeam.mirror = false;
healBeam.top = false;

healBeam.shootY = 14;
healBeam.x = 0;
healBeam.y = 0;

healBeam.parentizeEffects = true;
healBeam.reload = 2.5;
healBeam.shake = 0;
healBeam.recoil = 0;
healBeam.chargeSound = Sounds.lasercharge2;
healBeam.shootSound = Sounds.sap;
healBeam.continuous = true;
healBeam.cooldownTime = 0;

healBeam.shootStatus = StatusEffects.slow;
healBeam.shootStatusDuration = 10;
healBeam.bullet = healBullet;


// Create harvester unit type with overridden stats
const harvester = extendContent(UnitType,"harvester", {
  mineTier : 3,
  mineSpeed : 3.5,
  itemCapacity : 100
  // Rest is defined in content/units/harvester.hjson
})
harvester.weapons.add(healBeam)

// Make the constructor default dagger's
harvester.constructor = () => LegsUnit.create();
// Set MinerAI as defualt AI
harvester.defaultController = (u) => {
  const ai = extendContent(MinerAI, {
    updateMovement() {
      //this.unit.lookAt(this.unit.vel.angle());
      this.faceTarget();
      this.super$updateMovement();
      //this.target = this.unit.closestCore();
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
