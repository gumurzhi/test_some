import { ProfileService } from '../../profile/profile.service';

const profileService = new ProfileService();
export const getProfile = async (req, res, next) => {
  const profileId = req.get('profile_id') || 0;
  const profile = await profileService.findOne({ where: { id: +profileId } });
  if (!profile) return res.status(401).end();
  req.profile = profile;
  next();
};
