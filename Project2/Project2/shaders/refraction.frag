#version 330 core
in vec3 Normal;
in vec3 Position;
in vec2 TexCoords;

uniform float ratio;//change ratio for water, diamond etc.. typed of refraction
uniform vec3 cameraPos;
uniform sampler2D texture_diffuse1;
//uniform sampler2D texture_reflection1;
uniform samplerCube skybox;

out vec4 color;

void main()
{             
	// Diffuse
    vec4 diffuse_color = texture(texture_diffuse1, TexCoords);
    // Reflection
    vec3 I = normalize(Position - cameraPos);
    vec3 R = refract(I, normalize(Normal),ratio);	
	//reflection map not included
	//float reflect_intensity = texture(texture_reflection1, TexCoords);
    vec4 reflect_color;

    reflect_color = texture(skybox, R);

    color =diffuse_color+reflect_color;
}