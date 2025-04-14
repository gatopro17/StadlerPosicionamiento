// utils/state.js
const state = {
    trackerBuffers: {}, // Temporary buffer per trackerID
    trackerStatus: {}   // Final interpreted state per trackerID
  };
  
/**
 * Updates the buffer for a specific tracker.
 * 
 * This function stores incoming data for each tracker and maintains a buffer 
 * of a fixed size (last 5 messages).
 *
 * @param {string} trackerID - The ID of the tracker.
 * @param {Object} data - The data to be added to the buffer.
 */
  function updateBuffer(trackerID, data) {
    if (!state.trackerBuffers[trackerID]) {
      state.trackerBuffers[trackerID] = [];
    }
  
    state.trackerBuffers[trackerID].push(data);
  
    // Keep only last N messages (e.g., last 5)
    if (state.trackerBuffers[trackerID].length > 5) {
      state.trackerBuffers[trackerID].shift();
    }
  }
  
/**
 * Retrieves the buffer for a specific tracker.
 * 
 * @param {string} trackerID - The ID of the tracker.
 * @returns {Array} - The buffer array for the specified tracker.
 */
  function getBuffer(trackerID) {
    return state.trackerBuffers[trackerID] || [];
  }

  /**
 * Retrieves all tracker buffers.
 * 
 * @returns {Object} - An object containing all tracker buffers indexed by trackerID.
 */
  function getAllBuffers() {
    return state.trackerBuffers;
  }
  
  /**
 * Sets the status for a specific tracker.
 * 
 * @param {string} trackerID - The ID of the tracker.
 * @param {string} status - The status message to be set.
 */
  function setTrackerStatus(trackerID, status) {
    state.trackerStatus[trackerID] = status;
  }
  
  /**
 * Retrieves the status of a specific tracker.
 * 
 * @param {string} trackerID - The ID of the tracker.
 * @returns {string} - The status message for the specified tracker.
 */
  function getTrackerStatus(trackerID) {
    return state.trackerStatus[trackerID];
  }
  
  /**
 * Retrieves the status of all trackers.
 * 
 * @returns {Object} - An object containing all tracker statuses indexed by trackerID.
 */
  function getAllStatuses() {
    return state.trackerStatus;
  }
  
  module.exports = {
    updateBuffer,
    getBuffer,
    setTrackerStatus,
    getTrackerStatus,
    getAllStatuses,
    getAllBuffers
  };
  