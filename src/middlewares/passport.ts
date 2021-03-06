import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { config } from '../config/config';
import User from '../database/models/user';

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.SEED,
};

export default new Strategy(opts, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (e) {
    console.log(e);
  }
});
