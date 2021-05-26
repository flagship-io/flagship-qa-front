<template>
  <div>
    <h2 class="mt-5">
      Send Hit
    </h2>
    <form v-on:submit.prevent="sendHit()">
      <div class="form-group">
        <label>Hit type</label>
        <select class="form-control" v-model="hit.t" @change="changeType">
          <option v-for="t in hitTypes" :key="t" :value="t">
            {{ t }}
          </option>
        </select>
      </div>

      <div v-if="hit.t == 'EVENT'" class="form-group">
        <label>Event Category</label>
        <select class="form-control" v-model="hit.ec" required>
          <option value="ACTION_TRACKING">
            ACTION_TRACKING
          </option>
          <option value="USER_ENGAGEMENT">
            USER_ENGAGEMENT
          </option>
        </select>
      </div>

      <div v-if="hit.t == 'EVENT'" class="form-group">
        <label>Event Action</label>
        <input
          type="text"
          class="form-control"
          placeholder="Event Action"
          v-model="hit.ea"
          required
        />
      </div>

      <div v-if="hit.t == 'EVENT'" class="form-group">
        <label>Event Value</label>
        <input
          type="text"
          class="form-control"
          placeholder="Event Value"
          v-model.number="hit.ev"
        />
      </div>

      <div v-if="hit.t == 'EVENT'" class="form-group">
        <label>Event Label</label>
        <input
          type="text"
          class="form-control"
          placeholder="Event Label"
          v-model="hit.el"
        />
      </div>

      <div v-if="['TRANSACTION', 'ITEM'].includes(hit.t)" class="form-group">
        <label>Transaction ID</label>
        <input
          type="text"
          class="form-control"
          placeholder="Transaction ID"
          v-model="hit.tid"
          required
        />
      </div>

      <div v-if="['TRANSACTION'].includes(hit.t)" class="form-group">
        <label>Transaction Affiliation</label>
        <input
          type="text"
          class="form-control"
          placeholder="Transaction Affiliation"
          v-model="hit.ta"
          required
        />
      </div>

      <div v-if="['TRANSACTION'].includes(hit.t)" class="form-group">
        <label>Transaction Revenue</label>
        <input
          type="text"
          class="form-control"
          placeholder="Transaction Revenue"
          v-model.number="hit.tr"
        />
      </div>

      <div v-if="['TRANSACTION'].includes(hit.t)" class="form-group">
        <label>Shipping Cost</label>
        <input
          type="text"
          class="form-control"
          placeholder="Shipping Cost"
          v-model.number="hit.ts"
        />
      </div>

      <div v-if="['TRANSACTION'].includes(hit.t)" class="form-group">
        <label>Shipping Method</label>
        <input
          type="text"
          class="form-control"
          placeholder="Shipping Method"
          v-model.number="hit.sm"
        />
      </div>

      <div v-if="['TRANSACTION'].includes(hit.t)" class="form-group">
        <label>Transaction Taxes</label>
        <input
          type="text"
          class="form-control"
          placeholder="Transaction Taxes"
          v-model.number="hit.tt"
        />
      </div>

      <div v-if="['TRANSACTION'].includes(hit.t)" class="form-group">
        <label>Transaction Currency</label>
        <input
          type="text"
          class="form-control"
          placeholder="Transaction Currency"
          v-model.number="hit.tc"
        />
      </div>

      <div v-if="['TRANSACTION'].includes(hit.t)" class="form-group">
        <label>Payment Method</label>
        <input
          type="text"
          class="form-control"
          placeholder="Payment Method"
          v-model.number="hit.pm"
        />
      </div>

      <div v-if="['TRANSACTION'].includes(hit.t)" class="form-group">
        <label>Item Count</label>
        <input
          type="text"
          class="form-control"
          placeholder="Item Count"
          v-model.number="hit.icn"
        />
      </div>

      <div v-if="['TRANSACTION'].includes(hit.t)" class="form-group">
        <label>Coupon Code</label>
        <input
          type="text"
          class="form-control"
          placeholder="Coupon Code"
          v-model.number="hit.tcc"
        />
      </div>

      <div v-if="['SCREEN', 'PAGE'].includes(hit.t)" class="form-group">
        <label>Location</label>
        <input
          type="text"
          class="form-control"
          placeholder="Location"
          v-model="hit.dl"
          required
        />
      </div>

      <div v-if="['ITEM'].includes(hit.t)" class="form-group">
        <label>Item Name</label>
        <input
          type="text"
          class="form-control"
          placeholder="Item Name"
          v-model="hit.in"
          required
        />
      </div>

      <div v-if="['ITEM'].includes(hit.t)" class="form-group">
        <label>Item Code</label>
        <input
          type="text"
          class="form-control"
          placeholder="Item Code"
          v-model="hit.ic"
          required
        />
      </div>

      <div v-if="['ITEM'].includes(hit.t)" class="form-group">
        <label>Item Category</label>
        <input
          type="text"
          class="form-control"
          placeholder="Item Category"
          v-model.number="hit.iv"
        />
      </div>

      <div v-if="['ITEM'].includes(hit.t)" class="form-group">
        <label>Item Price</label>
        <input
          type="text"
          class="form-control"
          placeholder="Item Price"
          v-model.number="hit.ip"
        />
      </div>

      <div v-if="['ITEM'].includes(hit.t)" class="form-group">
        <label>Item Quantity</label>
        <input
          type="text"
          class="form-control"
          placeholder="Item Quantity"
          v-model.number="hit.iq"
        />
      </div>

      <div
        v-if="
          ['TRANSACTION', 'ITEM', 'EVENT', 'SCREEN', 'PAGE'].includes(hit.t)
        "
        class="form-group"
      >
        <label>Resolution Width</label>
        <input
          type="text"
          class="form-control"
          placeholder="Resolution Width"
          v-model="hit.re_wi"
        />
      </div>

      <div
        v-if="
          ['TRANSACTION', 'ITEM', 'EVENT', 'SCREEN', 'PAGE'].includes(hit.t)
        "
        class="form-group"
      >
        <label>Resolution Height</label>
        <input
          type="text"
          class="form-control"
          placeholder="Resolution Height"
          v-model="hit.re_he"
        />
      </div>

      <div
        v-if="
          ['TRANSACTION', 'ITEM', 'EVENT', 'SCREEN', 'PAGE'].includes(hit.t)
        "
        class="form-group"
      >
        <label>Local</label>
        <input
          type="text"
          class="form-control"
          placeholder="Local"
          v-model="hit.ul"
        />
      </div>

      <div
        v-if="
          ['TRANSACTION', 'ITEM', 'EVENT', 'SCREEN', 'PAGE'].includes(hit.t)
        "
        class="form-group"
      >
        <label>Ip</label>
        <input
          type="text"
          class="form-control"
          placeholder="Ip"
          v-model="hit.uip"
        />
      </div>

      <div
        v-if="
          ['TRANSACTION', 'ITEM', 'EVENT', 'SCREEN', 'PAGE'].includes(hit.t)
        "
        class="form-group"
      >
        <label>Session number</label>
        <input
          type="text"
          class="form-control"
          placeholder="Session number"
          v-model="hit.sn"
        />
      </div>

      <div class="alert alert-danger" v-if="eventError">
        {{ eventError.error }}
      </div>
      <div class="alert alert-success" v-if="eventOk">
        Hit sent OK !
      </div>

      <button type="submit" class="btn btn-info">Send event</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "qa",
  data() {
    return {
      eventOk: false,
      eventError: null,
      hit: { t: "EVENT" },
      hitTypes: ["EVENT", "TRANSACTION", "ITEM", "PAGE", "SCREEN"],
    };
  },
  methods: {
    changeType() {
      this.hit = {
        t: this.hit.t,
      };
    },
    sendHit() {
      this.eventOk = false;
      this.eventError = null;

      this.$http.post("/hit", this.hit).then(
        () => {
          this.eventOk = true;
        },
        (response) => {
          this.eventOk = false;
          this.eventError = response.body;
        }
      );
    },
  },
};
</script>
