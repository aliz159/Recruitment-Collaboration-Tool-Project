using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Web;

namespace Recruitment_Collaboration_Tool_MVC.classes
{
    public class Encryption
    {
        public const int SALT_SIZE = 24;
        public const int HASH_SIZE = 24;
        public const int PBKDF2_ITERATION = 24;

        public string CreatrHash(string password)
        {
            //generate random salt
            RNGCryptoServiceProvider csprng = new RNGCryptoServiceProvider();
            byte[] salt = new byte[SALT_SIZE];
            csprng.GetBytes(salt);

            //generate the passwordHash
            byte[] hash = PBKDF2(password, salt, PBKDF2_ITERATION, HASH_SIZE);
            return Convert.ToBase64String(salt) + ":" + Convert.ToBase64String(hash);
        }

        private byte[] PBKDF2(string password, byte[] salt, int pBKDF2_ITT, int outputBytes)
        {
            Rfc2898DeriveBytes pbkdf2 = new Rfc2898DeriveBytes(password, salt);
            pbkdf2.IterationCount = pBKDF2_ITT;
            return pbkdf2.GetBytes(outputBytes);
        }

        private bool SlowEquals(byte[] dbHash, byte[] passHash)
        {
            uint diff = (uint)dbHash.Length ^ (uint)passHash.Length;

            for (int i = 0; i < dbHash.Length && i < passHash.Length; i++)
            {
                diff |= (uint)dbHash[i] ^ (uint)passHash[i];
            }
            return diff == 0;
        }

        public bool ValidatePassword(string password, string dbHash)
        {
            char[] delimiter = { ':' };
            string[] split = dbHash.Split(delimiter);

            byte[] salt = Convert.FromBase64String(split[0]);
            byte[] hash = Convert.FromBase64String(split[1]);

            byte[] hashToValidate = PBKDF2(password, salt, PBKDF2_ITERATION, hash.Length);
            return SlowEquals(hash, hashToValidate);
        }
    }
}