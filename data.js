const parkingSlotsLength = Array.from(new Array(Number(process.env.AVAILABLE_PARKING_SLOTS)));

const parkingSlots = parkingSlotsLength.map((slot, idx) => {
  return {
    slotNo: idx + 1,
    availbale: true,
    carNo: ""
  }
});

module.exports = { parkingSlots }