<template>
  <div>
    <section class="section row align-middle">
      <div class="columns small-12 medium-6 large-6">
        <h3>Our Vision</h3>
        <h1 class="handwriting">
          We believe in a world where every child is inspired to build a purposeful and happy life
          through learning. Teach Starter creates brilliant teaching resources that save teachers
          hours each week preparing for the classroom.
        </h1>
        <p class="intro">
          Hundreds of thousands of teachers around the world rely on Teach Starter to help engage
          their students and make their classrooms buzz!
        </p>
      </div>

      <div class="columns small-12 medium-6 large-6">
        <img
          src="https://www.teachstarter.com/wp-content/themes/teachstarter_2015/images/App%20Asset%20-%20Teach%20Starter%20About%20Us%20Page%20Character%20Illustration.png"
          alt=""
          loading="lazy"
        />
      </div>
    </section>

    <section class="section row align-middle">
      <div class="columns small-12 medium-6 large-6">
        <img
          src="https://www.teachstarter.com/wp-content/themes/teachstarter_2015/images/ts_our-story.jpg"
          alt=""
          loading="lazy"
        />
      </div>

      <div class="columns small-12 medium-6 large-6">
        <h2>
          Our Story
        </h2>
        <p class="intro">
          In 2012, Teach Starter began as a humble email packed full of free resources. 12 months
          later, the Teach Starter website was launched.
        </p>

        <p class="intro">
          Fast-forward to today and members can download from over 140,000 pages of purposefully
          designed, premium teaching resources.
        </p>
      </div>
    </section>

    <section class="section">
      <ul class="row block-grid small-up-1 medium-up-3 large-up-3">
        <li>
          <h3>
            <img
              src="https://www.teachstarter.com/wp-content/themes/teachstarter_2015/images/logos/logo-ts-green-future.png"
              alt="Green Future"
              title="Green Future"
            />
          </h3>
          <p>
            We are committed to minimising our impact on the environment. Green Future is our active
            approach to sustainability.
          </p>
          <p>
            Through our Green Future program
            <a href="/one-million-trees-project/" title="View One Million trees project"
              >we have planted <strong>41369 trees</strong> and counting</a
            >, with the ultimate goal to plant one million trees by 2033.
          </p>
          <p>
            Teach Starter has also achieved Gold Sustainability Rating as awarded by Pangolin
            Associates in 2019.
          </p>
        </li>
        <li>
          <h3>
            <img
              src="https://www.teachstarter.com/wp-content/themes/teachstarter_2015/images/logos/logo-ts-vibe-tribe.png"
              alt="Vibe Tribe"
              title="Vibe Tribe"
            />
          </h3>
          <p>
            We are committed to building an inclusive, supportive and vibrant team. Vibe Tribe is
            our active approach to fostering a strong internal team culture.
          </p>
          <p>
            Through our Vibe Tribe program we have initiated monthly massages, regular social events
            and family days, and helped to welcome new starters to the Teach Starter team.
          </p>
        </li>
        <li>
          <h3>
            <img
              src="https://www.teachstarter.com/wp-content/themes/teachstarter_2015/images/logos/logo-ts-community.png"
              alt="Community"
              title="Community"
            />
          </h3>
          <p>
            We are committed to giving back to our local community. CommUnity is our active approach
            to charitable giving and forming strong connections within our community.
          </p>
          <p>
            Through our Community program we have donated money to over 20 charities and
            not-for-profits of our team's choosing, participated in fundraising, and raised
            awareness for causes close to our hearts.
          </p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
/* About
 *
 * @parent:
 * @requests:
 * @events:
 * @props:
 * @components:
 * @methods:
 */

export default {
  name: 'About',
  data() {
    return {
      title: 'About Teach Starter',
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'title', name: 'title', content: 'About Teach Starter' },
        { hid: 'description', name: 'description', content: 'My custom description' },
      ],
    };
  },
  nuxtI18n: false,
};
</script>

<style scoped lang="scss">
h1 {
  color: $ts-green-500;
}

h2 {
  font-size: $font-size-800;
}
</style>
