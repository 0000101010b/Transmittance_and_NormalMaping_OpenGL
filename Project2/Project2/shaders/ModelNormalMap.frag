#version 330 core
out vec4 FragColor;

in VS_OUT {
    vec3 FragPos;
    vec3 Normal;
    vec2 TexCoords;
    vec3 Tangent;
    vec3 Bitangent;
    mat3 TBN;
    vec3 TangentLightPos;
    vec3 TangentViewPos;
    vec3 TangentFragPos;
} fs_in;

//edited brick wall shader from learnopengl
uniform sampler2D texture_diffuse1;
uniform sampler2D texture_normal1;

uniform vec3 lightPos;
uniform vec3 viewPos;

uniform bool normalMapping;

void main()
{           
    vec3 normal = fs_in.Normal;
    mat3 tbn;
    //normal map in range [0,1]
    normal = texture(texture_normal1, fs_in.TexCoords).rgb;
	
	// normal vector to range [-1,1]
    normal = normalize(normal * 2.0 - 1.0);   
    
    // Get diffuse color
    vec3 color = texture(texture_diffuse1, fs_in.TexCoords).rgb;
    // Ambient
    vec3 ambient = 0.1 * color;
    // Diffuse
    vec3 lightDir = normalize(fs_in.TangentLightPos - fs_in.TangentFragPos);
    float diff = max(dot(lightDir, normal), 0.0);
    vec3 diffuse = diff * color;
    // Specular
    vec3 viewDir = normalize(fs_in.TangentViewPos - fs_in.TangentFragPos);
 
	vec3 reflectDir = reflect(-lightDir, normal);
    
	vec3 halfwayDir = normalize(lightDir + viewDir);  
	
	float spec = pow(max(dot(normal, halfwayDir), 0.0), 32.0);

    vec3 specular = vec3(0.2) * spec;
    FragColor = vec4(ambient + diffuse + specular, 1.0f);
}